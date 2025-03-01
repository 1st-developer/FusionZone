import { BASE_API_URL, DEFAULT_ERROR_MESSAGE } from "@/constants";
import { ICreatePostBody, ICreatePostResponce } from "@/types/post.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios";


const initialState = {
    loading: false,
    data: {} as ICreatePostResponce,
    error: ""
}


export const createPostFn = createAsyncThunk("create post", async (data: ICreatePostBody, {rejectWithValue}) => {
    try {

        const res = await axios.post(`${BASE_API_URL}/posts/create`, data, {
            headers: {
                Authorization: `Bearer ${data.token}`
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


export const createPostSlice = createSlice({
    name: "create post",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(createPostFn.pending, (state) => {
            state.loading = true;
            state.data = {} as ICreatePostResponce;
            state.error = ""
        });
        builder.addCase(createPostFn.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload as ICreatePostResponce;
            state.error = ""
        });
        builder.addCase(createPostFn.rejected, (state, action) => {
            state.loading = false;
            state.data = {} as ICreatePostResponce;
            state.error = action.payload as string;
        });
    }
});