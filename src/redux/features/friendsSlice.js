import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const url = 'http://localhost:8000/users/'

const initialState = {
    friends: [],
    requests: [],
    loading: false,
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
                    if(!(response.status === 200)) return new Promise.reject(new Error(response.data))
                    requests = [].concat(requests, response.data)
                })
                .catch(err => {
                    return Promise.reject(new Error('Could not find request of ' + user.friendRequests[i] + '\n' + err))
                })
        }
        return requests
    }
)

export const acceptRequest = createAsyncThunk(
    'friends/acceptRequest',
    async (users, thunkApi) => {
        if(!users) return Promise.reject(new Error('No users sent'))
        const { user , target } = users;
        await axios.post(url + 'acceptFriendRequest', { id: user,target: target})
            .then(async () => {
                await thunkApi.dispatch(fetchRequests())
                //TODO fetch friends
            })
            .catch(err => {
                return Promise.reject(new Error('Could not accept the friend request\n' + err))
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
                state.friends = []
                state.requests = []
                state.loading = true
                state.error = ''
            })
            .addCase(fetchRequests.fulfilled, (state, action) => {
                state.loading = false
                state.requests = action.payload
            })
            .addCase(fetchRequests.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(acceptRequest.pending, (state) => {
                state.loading = true
                state.error = ''
                state.friends = []
                state.requests = []
            })
            .addCase(acceptRequest.fulfilled, (state, action) => {
                state.loading = false
                state.requests = action.payload.user.friendRequests
                state.friends = action.payload.user.friends
            })
            .addCase(acceptRequest.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export default friendsSlice.reducer