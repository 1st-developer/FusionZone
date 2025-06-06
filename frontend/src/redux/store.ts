import {configureStore} from "@reduxjs/toolkit"
import { PostListSlice } from "./slice/postList.slice";
import { userListSlice } from "./slice/userList.slice";
import { loginSlice } from "./Auth/login.slice";
import { searchSlice } from "./slice/search.slice";
import { registerSlice } from "./Auth/register.slice";
import { updateProfileSlice } from "./slice/profile.slice";
import { getMyPostsSlice } from "./slice/my-post.slice";
import { createPostSlice } from "./slice/createPost.slice";
import { otherPostsSlice } from "./slice/otherProfiles.slices";
import { deletePostSlice } from "./slice/deletePostSlice";
import { getMyFollowSlice } from "./slice/getMyFollowing.slice";
import { createFollowSlice } from "./slice/follow.slice";
import { deleteMyFollowSlice } from "./slice/deleteFollow.slice";

export const store = configureStore({
    reducer: {
        PostListSlice: PostListSlice.reducer,
        userListSlice: userListSlice.reducer,
        loginSlice: loginSlice.reducer,
        searchSlice: searchSlice.reducer,
        registerSlice: registerSlice.reducer,
        updateProfileSlice: updateProfileSlice.reducer,
        getMyPostsSlice: getMyPostsSlice.reducer,
        createPostSlice: createPostSlice.reducer,
        otherPostsSlice: otherPostsSlice.reducer,
        deletePostSlice: deletePostSlice.reducer,
        getMyFollowSlice: getMyFollowSlice.reducer,
        createFollowSlice: createFollowSlice.reducer,
        deleteMyFollowSlice: deleteMyFollowSlice.reducer
    },
    devTools: true 
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch