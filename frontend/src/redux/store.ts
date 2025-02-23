import {configureStore} from "@reduxjs/toolkit"
import { PostListSlice } from "./slice/postList.slice";

export const store = configureStore({
    reducer: {
        PostListSlice: PostListSlice.reducer,
    },
    devTools: true 
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch