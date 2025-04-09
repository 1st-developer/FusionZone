import { BASE_API_URL, DEFAULT_ERROR_MESSAGE } from "@/constants";
import { IFollowUserBody, IFollowUserResponse } from "@/types/follow.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios";


const initialState = {
    loading: false,
    data: {} as IFollowUserResponse,
    error: ""
}

export const createFollowFn = createAsyncThunk("create follow", async (data: IFollowUserBody, {rejectWithValue}) => {
    try {

        const res = await axios.post(`${BASE_API_URL}/follow/create`, data, {
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


export const createFollowSlice = createSlice({
    name: "create follow",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(createFollowFn.pending, (state) => {
            state.loading = true;
            state.data = {} as IFollowUserResponse;
            state.error = ""
        });
        builder.addCase(createFollowFn.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload as IFollowUserResponse;
            state.error = ""

            localStorage.setItem("follow", JSON.stringify(action.payload));
        });
        builder.addCase(createFollowFn.rejected, (state, action) => {
            state.loading = false;
            state.data = {} as IFollowUserResponse;
            state.error = action.payload as string;
        });
    }
});