import { DEFAULT_ERROR_MESSAGE } from "@/constants";
import { IGoogleUserResponce } from "@/types/google.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios";

const DAFAULT_USER_DATA = localStorage.getItem("googleUserData") ? JSON.parse(localStorage.getItem("googleUserData")!) : {}

const initialState = {
    loading: false,
    data: (DAFAULT_USER_DATA as IGoogleUserResponce) || ({} as IGoogleUserResponce),
    error: ""
}

export const loginWithGoogleFn = createAsyncThunk(
    "auth/googleLogin",
    async (accessToken: string, { rejectWithValue }) => {
        try {
            const { data } = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const userData = { ...data, token: accessToken };
            localStorage.setItem("googleUserData", JSON.stringify(data));
            return userData;
        } catch (error) {
            if(error instanceof AxiosError) {
                return rejectWithValue(error.response?.data.Message || DEFAULT_ERROR_MESSAGE)
            }
            return rejectWithValue(DEFAULT_ERROR_MESSAGE)
        }
    }
);

export const googleLoginSlice = createSlice({
    name: "login slice",
    initialState,
    reducers: {
        logout: (state) => {
            state.loading = false;
            state.data = {} as IGoogleUserResponce;
            state.error = "";
            localStorage.removeItem("googleUserData");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginWithGoogleFn.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(loginWithGoogleFn.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(loginWithGoogleFn.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});


export const {logout} =  googleLoginSlice.actions;
