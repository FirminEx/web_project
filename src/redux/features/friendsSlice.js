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
    }
})

export default friendsSlice.reducer