import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, {AxiosError} from "axios"
import { BASE_API_URL, DEFAULT_ERROR_MESSAGE } from "@/constants";
import { IListPostResponse } from "@/types/post.type";


const initialState = {
    loading: false,
    data: {} as IListPostResponse,
    error: ""
};


export const postListFn = createAsyncThunk("post/list", async (_, {rejectWithValue}) => {
    try {
        
        const res = await axios.get(`${BASE_API_URL}/post/list`);
        
        return res.data
        
    } catch (error) {
        if(error instanceof AxiosError ) {
            return rejectWithValue(error.response?.data.Message || DEFAULT_ERROR_MESSAGE);
        }
        return rejectWithValue(DEFAULT_ERROR_MESSAGE);
    }

});

export const PostListSlice = createSlice({
    name: "list slice",
    initialState,
    reducers: {
        logout: (state) => {
            state.data = {} as IListPostResponse;
            state.error = "";
            state.loading = false;
        }
    },
    extraReducers(builder) {
        builder.addCase(postListFn.pending, (state) => {
            state.loading = true;
            state.error = "";
            state.data = {} as IListPostResponse;
        });
        builder.addCase(postListFn.fulfilled, (state, action) => {
            state.loading = false;
            state.error = "";
            state.data = action.payload
        });        
        builder.addCase(postListFn.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            state.data = {} as IListPostResponse;
        });
    }
});