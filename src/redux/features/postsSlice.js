import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const url = 'http://localhost:8000/posts'

const initialState = {
    postsList: [],
    loading: false,
    error: '',
}

const getPosts = async () => {
    //an async thunk has to return a promise of serializable data
    const response = await axios.get(url)
    return response.data
}

export const fetchAllPosts = createAsyncThunk(
    'posts/fetchAllPosts',
        async () => {
            return getPosts() //if we return only the get response, the data is not serializable (and we cannot put a '.data' on a axios.get)
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