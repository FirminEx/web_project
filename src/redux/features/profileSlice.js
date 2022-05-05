import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const url = 'http://localhost:8000/users/'
const postsUrl = 'http://localhost:8000/posts/'

const initialState = {
    profile: {},
    loading: false,
    error: '',
    friends: [],
    friendsLoading: false,
    friendsError: '',
    posts: [],
    postsLoading: [],
    postsError: [],
    requestLoading: false,
    requestSuccess: false,
    requestError: ''
}

export const fetchProfile = createAsyncThunk(
    'profile/fetchProfile',
    async (id, thunkAPi) => {
        const response = await axios.post(url + 'getUserId', { id: id })
        if(!(response.status === 200)) return Promise.reject(new Error(response.data))
        await thunkAPi.dispatch(fetchFriendsProfile(response.data))
        await thunkAPi.dispatch(fetchPostsProfile(response.data))
        return response.data;
    }
)

export const fetchFriendsProfile = createAsyncThunk(
    'profile/fetchFriendsProfile',
    async (user) => {
        if(!user) return Promise.reject(new Error('Not connected'))
        let friends = [];
        for(let i = 0 ; i < user.friends.length ; i++) {
            await axios.post(url + 'getUserId', {id: user.friends[i]})
                .then(response => {
                    if(!(response.status === 200)) return Promise.reject(new Error(response.data))
                    friends = [].concat(friends, response.data)
                })
                .catch(err => {
                    return Promise.reject(new Error('Could not find request of ' + user.friends[i] + '\n' + err))
                })
        }
        return friends
    }
)

export const fetchPostsProfile = createAsyncThunk(
    'profile/fetchPostsProfile',
    async (user) => {
        const response = await axios.post(postsUrl + 'getPostsUser', {userID: user._id})
            .catch(err =>  Promise.reject(err.message))
        if(!(response.status === 200)) return Promise.reject(new Error(response.data))
        return response.data
    }
)

export const sendFriendRequest = createAsyncThunk(
    'profile/sendFriendRequest',
    async (parameter) => {
        const response = await axios.post(url + 'sendFriendRequest', parameter)
            .catch(err => Promise.reject(err.message))
        if(!(response.status === 200)) return Promise.reject(new Error(response.data))
        return response.data;
    }
)

export const profileSlice = createSlice({
    name: 'display',
    initialState,
    reducers: {
        resetProfile: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.loading = true
                state.error = ''
                state.profile = {}
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.loading = false
                state.profile = action.payload
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(fetchFriendsProfile.pending, (state) => {
                state.friendsLoading = true
                state.friendsError = ''
                state.friends = []
            })
            .addCase(fetchFriendsProfile.fulfilled, (state, action) => {
                state.friendsLoading = false
                state.friends = action.payload
            })
            .addCase(fetchFriendsProfile.rejected, (state, action) => {
                state.friendsLoading = false
                state.friendsError = action.error.message
            })
            .addCase(fetchPostsProfile.pending, (state) => {
                state.postsLoading = true
                state.postsError = ''
                state.posts = []
            })
            .addCase(fetchPostsProfile.fulfilled, (state, action) => {
                state.postsLoading = false
                state.posts = action.payload
            })
            .addCase(fetchPostsProfile.rejected, (state, action) => {
                state.postsLoading = false
                state.postsError = action.error.message
            })
            .addCase(sendFriendRequest.pending, (state) => {
                state.requestLoading = true
                state.requestSuccess = false
                state.requestError = ''
            })
            .addCase(sendFriendRequest.fulfilled, (state) => {
                state.requestLoading = false
                state.requestSuccess = true
            })
            .addCase(sendFriendRequest.rejected, (state, action) => {
                state.requestLoading = false
                state.requestError = action.error.message
            })
    }
})

export default profileSlice.reducer