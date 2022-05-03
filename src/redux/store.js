import { configureStore } from '@reduxjs/toolkit'
import postsReducer from "./features/postsSlice";
import logInReducer from "./features/logiInSlice";
import newPostSlice from "./features/newPostSlice";
import displaySlice from "./features/displaySlice";

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        logIn: logInReducer,
        newPost: newPostSlice,
        display: displaySlice,
    },
})