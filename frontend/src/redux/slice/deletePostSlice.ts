import { BASE_API_URL, DEFAULT_ERROR_MESSAGE } from "@/constants";
import { IDeletePostBody, IDeletePostResponse } from "@/types/post.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios";


const initialState = {
    loading: false,
    data: {} as IDeletePostResponse,
    error: ""
}

export const deletePostFn = createAsyncThunk("delete posts", async (data: IDeletePostBody, {rejectWithValue}) => {
    try {
        const res = await axios.delete(`${BASE_API_URL}/posts/delete/:${data}`, {
            headers: {
                Authorization: `Barear ${data.token}`
            }
        });

        return res.data
        
    } catch (error) {
        if(error instanceof AxiosError) {
            return rejectWithValue(error.response?.data.Message || DEFAULT_ERROR_MESSAGE)
        }
        return rejectWithValue(DEFAULT_ERROR_MESSAGE);
    }
});


export const deletePostSlice = createSlice({
    name: "delete posts",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(deletePostFn.pending, (state) => {
            state.loading = true;
            state.data = {} as IDeletePostResponse;
            state.error = ""
        });
        builder.addCase(deletePostFn.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload as IDeletePostResponse;
            state.error = ""
        });
        builder.addCase(deletePostFn.rejected, (state, action) => {
            state.loading = false;
            state.data = {} as IDeletePostResponse;
            state.error = action.payload as string
        });
    }
});