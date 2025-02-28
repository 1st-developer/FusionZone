import { BASE_API_URL, DEFAULT_ERROR_MESSAGE } from "@/constants";
import { IListMyPostsResponse } from "@/types/post.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios";

const initialState = {
    loading: false,
    data: {} as IListMyPostsResponse,
    error: ""
}

export const getMyPostsFn = createAsyncThunk("/posts/my-posts", async (token: string, {rejectWithValue}) => {
    try {

        const res = await axios.get(`${BASE_API_URL}/posts/my-posts`, {
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


export const getMyPostsSlice = createSlice({
    name: "get my-posts",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(getMyPostsFn.pending, (state) => {
            state.loading = true;
            state.data = {} as IListMyPostsResponse;
            state.error = "";
        });
        builder.addCase(getMyPostsFn.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload as IListMyPostsResponse;
            state.error = "";
        });
        builder.addCase(getMyPostsFn.rejected, (state, action) => {
            state.loading = false;
            state.data = {} as IListMyPostsResponse,
            state.error = action.payload as string;
        });
    }
})