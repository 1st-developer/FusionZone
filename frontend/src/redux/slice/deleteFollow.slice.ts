import { BASE_API_URL, DEFAULT_ERROR_MESSAGE } from "@/constants";
import { IFollowUserBody, IDeleteFollowResponse } from "@/types/follow.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios";

const initialState = {
    loading: false,
    data: {} as IDeleteFollowResponse,
    error: ""
}

export const deleteMyFollowingFn = createAsyncThunk("/follow/delete", async (data: IFollowUserBody, {rejectWithValue}) => {
    try {

        const res = await axios.delete(`${BASE_API_URL}/follow/delete`, {
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


export const deleteMyFollowSlice = createSlice({
    name: "delete my following",
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder.addCase(deleteMyFollowingFn.pending, (state) => {
            state.loading = true;
            state.data = {} as IDeleteFollowResponse;
            state.error = "";
        });
        builder.addCase(deleteMyFollowingFn.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload as IDeleteFollowResponse;
            state.error = "";
        });
        builder.addCase(deleteMyFollowingFn.rejected, (state, action) => {
            state.loading = false;
            state.data = {} as IDeleteFollowResponse,
            state.error = action.payload as string;
        });
    }
});