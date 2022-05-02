import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const url = 'http://localhost:8000/users/logIn'

const initialState = {
    user: {},
    connected: false,
    loading: false,
    error: '',
}

/*const logInPromise = async (mail) => {
    const response = await axios.post(url, {mail: mail})
    return response.status === 200 ? response.data : response.statusText
}*/

export const logIn = createAsyncThunk(
    'users/logIn',
    async (credentials) => {
        const response = await axios.post(url, credentials)
        if (!(response.status === 200)) {
            return Promise.reject(new Error(response.data))
        }
        return response.data
    }
)


export const logInSlice = createSlice({
    name: 'logIn',
    initialState,
    reducers: {
        logOut: (state) => {
            state.user = {}
            state.connected = false
            state.loading = false
            state.error = ''
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
                state.error = action.error.message
            })
    }

})
export default logInSlice.reducer