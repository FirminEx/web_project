import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {logInSlice} from "./logiInSlice";
import {fetchFriends} from "./friendsSlice";

const url = 'http://localhost:8000/users/'

const initialState = {
    loadingUserName: false,
    successUserName: false,
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
        await thunkApi.dispatch(logInSlice.actions.updateUserName(response.data))
        return response.data
    }
)

export const changePlace = createAsyncThunk(
    'settings/changePlace',
    async (parameters, thunkApi) => {
        const { id, newPlace } = parameters;
        const response = await axios.post(url + 'changePlace', {id: id, newPlace: newPlace})
        if(!(response.status === 200)) return Promise.reject(new Error(response.data))
        console.log(response)
        await thunkApi.dispatch(logInSlice.actions.updatePlace(newPlace))
        return response.data
    }
)

export const changeBio = createAsyncThunk(
    'settings/changeBio',
    async (parameters, thunkApi) => {
        const { id, newBio } = parameters;
        const response = await axios.post(url + 'changeBio', {id: id, newBio: newBio})
        if(!(response.status === 200)) return Promise.reject(new Error(response.data))
        await thunkApi.dispatch(logInSlice.actions.updateBio(response.data))
        return response.data
    }
)

export const updateFriend = createAsyncThunk(
    '/settings/deleteFriend',
    async (parameters, thunkApi) => {
        const { user, target } = parameters
        const userID = user._id
        const response = await axios.post(url + 'deleteFriend', {userID: userID, target: target})
        if(!(response.status === 200)) return Promise.reject(new Error(response.data))
        await thunkApi.dispatch(logInSlice.actions.updateFriends(response.data))
        await thunkApi.dispatch(fetchFriends({//we have to fetch friends with the updated user, but the const user here is passed by copy (so it has the same values as before deleting the friend). So we pass a user with updated friends list
            ...user,
            friends: response.data
        }))
        return response.data
    }
)


export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        resetSettings: () => initialState,
        setErrorUserName: (state, action) => {
            return {
                ...state,
                errorUserName: action.payload,
                loadingUserName: '',
                successUserName: false,
            }
        }
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
                state.successPlace = true
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
            .addCase(updateFriend.pending, (state) => {
                state.loadingFriends = true
                state.errorFriends = ''
                state.successFriends = false
            })
            .addCase(updateFriend.fulfilled, (state) => {
                state.loadingFriends = false
                state.successFriends = true
            })
            .addCase(updateFriend.rejected, (state, action) => {
                state.loadingFriends = false
                state.errorFriends = action.error.message
            })

    }
})

export default settingsSlice.reducer