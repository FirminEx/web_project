import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const url = 'http://localhost:8000/posts'

const initialState = {
    postsList: [],
    loading: false,
    error: '',
}

export const fetchPostsDiscover = createAsyncThunk(
    'posts/fetchPostsDiscover',
        async () => {
            const response = await axios.get(url)
            if(!(response.status === 200)) {
                return Promise.reject(new Error(response.data))
            }
            return response.data
        }
)

export const fetchPostsSubscription = createAsyncThunk(
    'posts/fetchPostsSubscription',
    async (user) => {
        if(!user) return Promise.reject(new Error('Not connected'))
        let posts = []
        console.log('user', user.subscription)
        for(let i = 0 ; i < user.subscription.length ; i++) {
            await axios.post(url + '/getPostsUser', {userID: user.subscription[i]})
                .then(response => {
                    if(!(response.status === 200)) return Promise.reject(new Error(response.data))
                    posts = [].concat(posts, response.data.posts)
                })
                .catch(error => {
                        return Promise.reject(new Error('Could not find posts of ' + user.subscription[i] + '\n'+  error))
                    })
        }
        return posts
    }
)



export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPostsDiscover.pending, (state) => {
                state.loading = true
                state.postsList = []
                state.error = ''
            })
            .addCase(fetchPostsDiscover.fulfilled, (state, action) => {
                state.loading = false
                state.postsList = action.payload
            })
            .addCase(fetchPostsDiscover.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(fetchPostsSubscription.pending, (state) => {
                state.loading = true
                state.postsList = []
                state.error = ''
            })
            .addCase(fetchPostsSubscription.fulfilled, (state, action) => {
                state.loading = false
                state.postsList = action.payload
            })
            .addCase(fetchPostsSubscription.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })

    }

})

export default postsSlice.reducer