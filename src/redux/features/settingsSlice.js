import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const url = 'http://localhost:8000/users/'

const initialState = {
    loadingUserName: false,
    successUserName: true,
    errorUserName: '',
    loadingPlace: false,
    successPlace: false,
    errorPlace: '',
    loadingBio: false,
    successBio: false,
    errorBio: '',
    loadingPicture: false,
    successPicture: false,
    errorPicture: '',
    loadingFriends: false,
    successFriends: false,
    errorFriends: '',
}

export const changeUserName = createAsyncThunk(
    'settings/changeUsername',
    async (parameters, thunkApi) => {
        const { id, newUserName } = parameters;
        const response = await axios.post(url + 'changeUsername', {id: id, newUserName: newUserName})
        if(!(response.status === 200)) return Promise.reject(new Error(response.data))
        //TODO update current profile (logIn slice new function fetch userName)
        return response.data
    }
)

export const changePlace = createAsyncThunk(
    'settings/changePlace',
    async (parameters, thunkApi) => {
        const { id, newPlace } = parameters;
        const response = await axios.post(url + 'changePlace', {id: id, newPlace: newPlace})
        if(!(response.status === 200)) return Promise.reject(new Error(response.data))
        //TODO update current profile (logIn slice new function fetch userName)
        return response.data
    }
)

export const changeBio = createAsyncThunk(
    'settings/changeBio',
    async (parameters, thunkApi) => {
        const { id, newBio } = parameters;
        const response = await axios.post(url + 'changeBio', {id: id, newBio: newBio})
        if(!(response.status === 200)) return Promise.reject(new Error(response.data))
        //TODO update current profile (logIn slice new function fetch userName)
        return response.data
    }
)


export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        resetSettings: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(changeUserName.pending, (state) => {
                state.loadingUserName = true
                state.errorUserName = ''
                state.successUserName = false
            })
            .addCase(changeUserName.fulfilled, (state) => {
                state.loadingUserName = false
                state.successUserName = true
            })
            .addCase(changeUserName.rejected, (state, action) => {
                state.loadingUserName = false
                state.errorUserName = action.error.message
            })
            .addCase(changePlace.pending, (state) => {
                state.loadingPlace = true
                state.errorPlace = ''
                state.successPlace = false
            })
            .addCase(changePlace.fulfilled, (state) => {
                state.loadingPlace = false
                state.successUserPlace = true
            })
            .addCase(changePlace.rejected, (state, action) => {
                state.loadingPlace = false
                state.errorUserPlace = action.error.message
            })
            .addCase(changeBio.pending, (state) => {
                state.loadingBio = true
                state.errorBio = ''
                state.successBio = false
            })
            .addCase(changeBio.fulfilled, (state) => {
                state.loadingBio = false
                state.successBio = true
            })
            .addCase(changeBio.rejected, (state, action) => {
                state.loadingBio = false
                state.errorBio = action.error.message
            })

    }
})

export default settingsSlice.reducer