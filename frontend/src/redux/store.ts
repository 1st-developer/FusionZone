import {configureStore} from "@reduxjs/toolkit"
import { PostListSlice } from "./slice/postList.slice";
import { userListSlice } from "./slice/userList.slice";
import { loginSlice } from "./Auth/login.slice";

export const store = configureStore({
    reducer: {
        PostListSlice: PostListSlice.reducer,
        userListSlice: userListSlice.reducer,
        loginSlice: loginSlice.reducer,
    },
    devTools: true 
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch