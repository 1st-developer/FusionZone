import { BASE_API_URL, DEFAULT_ERROR_MESSAGE } from "@/constants";
import { IUpdateProfileBody, IUpdateProfileResponse } from "@/types/profile.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios";

const initialState = {
    loading: false,
    data: {} as IUpdateProfileResponse,
    error: ""
}

export const updateProfileFn = createAsyncThunk("/profile/update", async (data: IUpdateProfileBody, {rejectWithValue}) => {
    try {

        const res = await axios.put(`${BASE_API_URL}/profile/update`, data, {
            headers: {
                Authorization: `Bearar ${data.token}`
            }
        });

        return res.data
        
    } catch (error) {
        if(error instanceof AxiosError) {
            return rejectWithValue(error.response?.data.Message || DEFAULT_ERROR_MESSAGE);
        }

        return rejectWithValue(DEFAULT_ERROR_MESSAGE);
    }
});


export const updateProfileSlice = createSlice({
    name: "update profile",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(updateProfileFn.pending, (state) => {
            state.loading = true;
            state.data = {} as IUpdateProfileResponse;
            state.error = "";
        });
        builder.addCase(updateProfileFn.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload as IUpdateProfileResponse;
            state.error = "";
        });
        builder.addCase(updateProfileFn.rejected, (state, action) => {
            state.loading = false;
            state.data = {} as IUpdateProfileResponse,
            state.error = action.payload as string;
        });
    }
})