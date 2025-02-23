import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, {AxiosError} from "axios"
import { BASE_API_URL, DEFAULT_ERROR_MESSAGE } from "@/constants";
import { IListUserResponse } from "@/types/user.type";


const initialState = {
    loading: false,
    data: {} as IListUserResponse,
    error: ""
};


export const userListFn = createAsyncThunk("users/list", async (_, {rejectWithValue}) => {
    try {
        
        const res = await axios.get(`${BASE_API_URL}/users/list`);
        
        return res.data
        
    } catch (error) {
        if(error instanceof AxiosError ) {
            return rejectWithValue(error.response?.data.Message || DEFAULT_ERROR_MESSAGE);
        }
        return rejectWithValue(DEFAULT_ERROR_MESSAGE);
    }

});

export const userListSlice = createSlice({
    name: "list users",
    initialState,
    reducers: {
        logout: (state) => {
            state.data = {} as IListUserResponse;
            state.error = "";
            state.loading = false;
        }
    },
    extraReducers(builder) {
        builder.addCase(userListFn.pending, (state) => {
            state.loading = true;
            state.error = "";
            state.data = {} as IListUserResponse;
        });
        builder.addCase(userListFn.fulfilled, (state, action) => {
            state.loading = false;
            state.error = "";
            state.data = action.payload
        });        
        builder.addCase(userListFn.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            state.data = {} as IListUserResponse;
        });
    }
});