import { configureStore } from '@reduxjs/toolkit'
import postsReducer from "./features/postsSlice";
import logInReducer from "./features/logiInSlice";

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        logIn: logInReducer,
    },
})