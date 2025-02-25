import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, {AxiosError} from "axios"
import { BASE_API_URL, DEFAULT_ERROR_MESSAGE } from "@/constants";
import { ISearch } from "@/types/search.type";


const initialState = {
    loading: false,
    data: {} as ISearch,
    error: ""
};


export const searchFn = createAsyncThunk("search/list", async (searchTerm: string, { rejectWithValue }) => {
    try {

        const res = await axios.get(`${BASE_API_URL}/search/list/${searchTerm}`); 
        
        return res.data;

    } catch (error) {
        if (error instanceof AxiosError) {
            return rejectWithValue(error.response?.data.Message || DEFAULT_ERROR_MESSAGE);
        }
        return rejectWithValue(DEFAULT_ERROR_MESSAGE);
    }
});


export const searchSlice = createSlice({
    name: "list search",
    initialState,
    reducers: {
        logout: (state) => {
            state.data = {} as ISearch;
            state.error = "";
            state.loading = false;
        }
    },
    extraReducers(builder) {
        builder.addCase(searchFn.pending, (state) => {
            state.loading = true;
            state.error = "";
            state.data = {} as ISearch;
        });
        builder.addCase(searchFn.fulfilled, (state, action) => {
            state.loading = false;
            state.error = "";
            state.data = action.payload
        });        
        builder.addCase(searchFn.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            state.data = {} as ISearch;
        });
    }
});