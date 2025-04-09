import { BASE_API_URL, DEFAULT_ERROR_MESSAGE } from "@/constants";
import { IListFollowUserResponse } from "@/types/follow.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios";

const initialState = {
    loading: false,
    data: {} as IListFollowUserResponse,
    error: ""
}

export const getMyFollowingFn = createAsyncThunk("/follow/list", async (token: string, {rejectWithValue}) => {
    try {

        const res = await axios.get(`${BASE_API_URL}/follow/list`, {
            headers: {
                Authorization: `Bearar ${token}`
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


export const getMyFollowSlice = createSlice({
    name: "get my following",
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder.addCase(getMyFollowingFn.pending, (state) => {
            state.loading = true;
            state.data = {} as IListFollowUserResponse;
            state.error = "";
        });
        builder.addCase(getMyFollowingFn.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload as IListFollowUserResponse;
            state.error = "";
        });
        builder.addCase(getMyFollowingFn.rejected, (state, action) => {
            state.loading = false;
            state.data = {} as IListFollowUserResponse,
            state.error = action.payload as string;
        });
    }
});