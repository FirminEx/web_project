import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {displaySlice} from './displaySlice'
import { fetchPostsFriends, postsSlice} from "./postsSlice";
import {fetchFriends, fetchRequests, friendsSlice} from "./friendsSlice";
import {settingsSlice} from "./settingsSlice";
import {profileSlice} from "./profileSlice";

const url = 'http://localhost:8000/users/'

const initialState = {
    user: {},
    loading: false,
    errorLogIn: '',
    errorRegister: '',
    connected: false,
}

export const logIn = createAsyncThunk(
    'users/logIn',
    async (credentials, thunkApi) => {
        const response = await axios.post(url + 'logIn', credentials)
        if (!(response.status === 200)) {
            return Promise.reject(new Error(response.data))
        }
        await thunkApi.dispatch(fetchPostsFriends(response.data))
        await thunkApi.dispatch(fetchRequests(response.data))
        await thunkApi.dispatch(fetchFriends(response.data))
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
        await thunkApi.dispatch(friendsSlice.actions.resetFriends())
        await thunkApi.dispatch(postsSlice.actions.reset())
        await thunkApi.dispatch(settingsSlice.actions.resetSettings())
        await thunkApi.dispatch(profileSlice.actions.resetProfile())
        await thunkApi.dispatch(displaySlice.actions.loggedOut())
        await thunkApi.dispatch(displaySlice.actions.goToDiscover())
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
        updatePlace: (state, action) => {
            return {
                ...state,
                user: {
                    ...state.user,
                    place: action.payload
                }
            }
        },
        updateBio: (state, action) => {
            return {
                ...state,
                user: {
                    ...state.user,
                    bio: action.payload
                }
            }
        },
        updateUserName: (state, action) => {
            return {
                ...state,
                user: {
                    ...state.user,
                    userName: action.payload
                }
            }
        },
        updateFriends: (state, action) => {
            return {
                ...state,
                user: {
                    ...state.user,
                    friends: action.payload
                }
            }
        },
        updatePicture: (state, action) => {
            return {
                ...state,
                user: {
                    ...state.user,
                    picture: action.payload
                }
            }
        }
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