import { BASE_API_URL, DEFAULT_ERROR_MESSAGE } from "@/constants";
import { ILoginUserBody, ILoginUserResponce } from "@/types/login.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios";

const DAFAULT_USER_DATA = localStorage.getItem("loginData") ? JSON.parse(localStorage.getItem("loginData")!) : {}

const initialState = {
    loading: false,
    data: (DAFAULT_USER_DATA as ILoginUserResponce) || ({} as ILoginUserResponce),
    error: ""
}

export const loginFn = createAsyncThunk("users/login", async (data: ILoginUserBody, {rejectWithValue}) => {

    try {

        const res = await axios.post(`${BASE_API_URL}/users/login`, data)
        
        return res.data
        
    } catch (error) {
        if(error instanceof AxiosError) {
            return rejectWithValue(error.response?.data.Message || DEFAULT_ERROR_MESSAGE)
        }
        
        return rejectWithValue(DEFAULT_ERROR_MESSAGE)
    }

});



export const loginSlice = createSlice({
    name: "login slice",
    initialState,
    reducers: {
        logout: (state) => {
            state.loading = false;
            state.data = {} as ILoginUserResponce;
            state.error = "";

            localStorage.removeItem("loginData");
        }
    },
    extraReducers(builder) {
        builder.addCase(loginFn.pending, (state) => {
            state.loading = true;
            state.data = {} as ILoginUserResponce;
            state.error = "";
        });
        builder.addCase(loginFn.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload as ILoginUserResponce;
            state.error = "";
        }); 
        builder.addCase(loginFn.rejected, (state, action) => {
            state.loading = false;
            state.data = {} as ILoginUserResponce;
            state.error = action.payload as string
        });
    }
});

export const {logout} =  loginSlice.actions;
