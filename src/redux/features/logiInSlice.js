import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {displaySlice} from './displaySlice'
import {fetchPostsSubscription, postsSlice} from "./postsSlice";

const url = 'http://localhost:8000/users/'

const initialState = {
    user: {},
    loading: false,
    errorLogIn: '',
    errorRegister: '',
    connected: false
}

export const logIn = createAsyncThunk(
    'users/logIn',
    async (credentials, thunkApi) => {
        const response = await axios.post(url + 'logIn', credentials)
        if (!(response.status === 200)) {
            return Promise.reject(new Error(response.data))
        }
        await thunkApi.dispatch(fetchPostsSubscription(response.data))
        await thunkApi.dispatch(displaySlice.actions.loggedIn(null))
        return response.data

    }
)

export const register = createAsyncThunk(
    'users/register',
    async (credentials, thunkApi) => {
        const response = await axios.post(url, credentials)
        if(!(response.status === 200)) {
            return Promise.reject(new Error(response.data))
        }
        thunkApi.dispatch(logIn({ mail: credentials.mail, password: credentials.password}))
    }
)

export const logOut = createAsyncThunk(
    'users/logOut',
    async (arg, thunkApi) => {
        await thunkApi.dispatch(logInSlice.actions.logOutUser())
        await thunkApi.dispatch(displaySlice.actions.loggedOut())
        await thunkApi.dispatch(postsSlice.actions.reset())
    }
)

export const logInSlice = createSlice({
    name: 'logIn',
    initialState,
    reducers: {
        logOutUser: (state) => {
            state.user = {}
            state.connected = false
            state.loading = false
            state.errorLogIn = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(logIn.pending, (state) => {
                state.loading = true
                state.user = {}
                state.connected = false
            })
            .addCase(logIn.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
                state.connected = true
            })
            .addCase(logIn.rejected, (state, action) => {
                state.loading = false
                state.errorLogIn = action.error.message
                state.connected = false
            })
            .addCase(register.pending, (state) => {
                state.loading = true
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false
                state.errorRegister = action.error.message
            })

    }

})
export default logInSlice.reducer