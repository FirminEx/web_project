import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const url = 'http://localhost:8000/users/'

const initialState = {
    friends: [],
    requests: [],
    loadingFriends: false,
    loadingRequests: false,
    error: ''
}

export const fetchRequests = createAsyncThunk(
    'friends/fetchRequests',
    async (user) => {
        if(!user) return Promise.reject(new Error('Not connected'))
        let requests = [];
        for(let i = 0 ; i < user.friendRequests.length ; i++) {
            await axios.post(url + 'getUserId', {id: user.friendRequests[i]})
                .then(response => {
                    if(!(response.status === 200)) return Promise.reject(new Error(response.data))
                    requests = [].concat(requests, response.data)
                })
                .catch(err => {
                    return Promise.reject(new Error('Could not find request of ' + user.friendRequests[i] + '\n' + err))
                })
        }
        return requests
    }
)

export const fetchFriends = createAsyncThunk(
    'friends/fetchFriends',
    async (user) => {
        if(!user) return Promise.reject(new Error('Not connected'))
        let friends = [];
        for(let i = 0 ; i < user.friends.length ; i++) {
            await axios.post(url + 'getUserId', {id: user.friends[i]})
                .then(response => {
                    if(!(response.status === 200)) return new Promise.reject(new Error(response.data))
                    friends = [].concat(friends, response.data)
                })
                .catch(err => {
                    return Promise.reject(new Error('Could not find request of ' + user.friends[i] + '\n' + err))
                })
        }
        return friends
    }
)
export const acceptRequest = createAsyncThunk(
    'friends/acceptRequest',
    async (users, thunkApi) => {
        if(!users) return Promise.reject(new Error('No users sent'))
        const { user , target } = users;
        await axios.post(url + 'acceptFriendRequest', { id: user,target: target})
            .then(async response => {
                await thunkApi.dispatch(fetchRequests({ //same technique as described in settings slice
                    ...user,
                    friendRequests: response.data.user.friendRequests
                }))
                await thunkApi.dispatch(fetchFriends({
                    ...user,
                    friends: response.data.user.friends
                }))
                return true
            })
            .catch(err => {
                return Promise.reject(new Error('Could not accept the friend request' + err))
            })
    }
)

export const friendsSlice = createSlice({
    name: 'friends',
    initialState,
    reducers: {
        resetFriends: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRequests.pending, (state) => {
                state.requests = []
                state.loadingRequests = true
                state.error = ''
            })
            .addCase(fetchRequests.fulfilled, (state, action) => {
                state.loadingRequests = false
                state.requests = action.payload
            })
            .addCase(fetchRequests.rejected, (state, action) => {
                state.loadingRequests = false
                state.error = action.payload
            })
            .addCase(fetchFriends.pending, (state) => {
                state.friends = []
                state.loadingFriends = true
                state.error = ''
            })
            .addCase(fetchFriends.fulfilled, (state, action) => {
                state.loadingFriends = false
                state.friends = action.payload
            })
            .addCase(fetchFriends.rejected, (state, action) => {
                state.loadingFriends = false
                state.error = action.payload
            })
            .addCase(acceptRequest.pending, (state) => {
                state.loadingRequests = true
                state.error = ''
            })
            .addCase(acceptRequest.fulfilled, (state) => {
                state.loadingRequests = false
            })
            .addCase(acceptRequest.rejected, (state, action) => {
                state.loadingRequests = false
                state.error = action.payload
            })
    }
})

export default friendsSlice.reducer