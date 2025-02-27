import {configureStore} from "@reduxjs/toolkit"
import { PostListSlice } from "./slice/postList.slice";
import { userListSlice } from "./slice/userList.slice";
import { loginSlice } from "./Auth/login.slice";
import { searchSlice } from "./slice/search.slice";
import { registerSlice } from "./Auth/register.slice";

export const store = configureStore({
    reducer: {
        PostListSlice: PostListSlice.reducer,
        userListSlice: userListSlice.reducer,
        loginSlice: loginSlice.reducer,
        searchSlice: searchSlice.reducer,
        registerSlice: registerSlice.reducer,
    },
    devTools: true 
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch