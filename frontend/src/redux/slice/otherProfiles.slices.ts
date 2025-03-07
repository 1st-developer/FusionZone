import { BASE_API_URL, DEFAULT_ERROR_MESSAGE } from "@/constants";
import { IListOthePostsResponse } from "@/types/otherProfiles.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios";



const initialState = {
    loading: false,
    data: {} as IListOthePostsResponse,
    error: ""
}


export const otherPostsFn = createAsyncThunk("list other posts", async(user_Id: string, {rejectWithValue}) => {
    try {

        const res = await axios.get(`${BASE_API_URL}/posts/other-posts/${user_Id}`);

        return res.data;
        
    } catch (error) {
        if(error instanceof AxiosError) {
            return rejectWithValue(error.response?.data.Message || DEFAULT_ERROR_MESSAGE);
        }
        return rejectWithValue(DEFAULT_ERROR_MESSAGE);
    }
});

export const otherPostsSlice = createSlice({
    name: "list other posts",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(otherPostsFn.pending, (state) => {
            state.loading = true;
            state.data = {} as IListOthePostsResponse;
            state.error = "";
        });
        builder.addCase(otherPostsFn.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload as IListOthePostsResponse;
            state.error = "";
        });
        builder.addCase(otherPostsFn.rejected, (state, action) => {
            state.loading = false;
            state.data = {} as IListOthePostsResponse;
            state.error = action.payload as string;
        });
    }
});