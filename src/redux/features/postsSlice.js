import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const url = 'http://localhost:8000/posts'

const initialState = {
    postsList: [],
    loading: false,
    error: '',
}

export const fetchAllPosts = createAsyncThunk(
    'posts/fetchAllPosts',
        async () => {
            const response = await axios.get(url)
            if(!(response.status === 200)) {
                return Promise.reject(new Error(response.data))
            }
            return response.data
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
            .addCase(fetchAllPosts.pending, (state) => {
                state.loading = true
                state.postsList = []
            })
            .addCase(fetchAllPosts.fulfilled, (state, action) => {
                state.loading = false
                state.postsList = action.payload
            })
            .addCase(fetchAllPosts.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }

})

export default postsSlice.reducer