import { BASE_API_URL, DEFAULT_ERROR_MESSAGE } from "@/constants";
import { IRegisterUserBody, IRegisterUserResponse } from "@/types/register.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios";

const initialState = {
    loading: false,
    data: {} as IRegisterUserResponse,
    error: ""
}

export const RegisterFn = createAsyncThunk("users/register", async(data: IRegisterUserBody, {rejectWithValue}) => {

    try {

        const res = await axios.post(`${BASE_API_URL}/users/register`, data)
        
        return res.data
        
    } catch (error) {
        if(error instanceof AxiosError) {
            return rejectWithValue(error.response?.data.Message || DEFAULT_ERROR_MESSAGE)
        }
        
        return rejectWithValue(DEFAULT_ERROR_MESSAGE)
    }

});



export const registerSlice = createSlice({
    name: "register slice",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(RegisterFn.pending, (state) => {
            state.loading = true;
            state.data = {} as IRegisterUserResponse;
            state.error = "";
        });
        builder.addCase(RegisterFn.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload as IRegisterUserResponse;
            state.error = "";
        }); 
        builder.addCase(RegisterFn.rejected, (state, action) => {
            state.loading = false;
            state.data = {} as IRegisterUserResponse;
            state.error = action.payload as string
        });
    }
});
