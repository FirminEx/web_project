import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const url = 'http://localhost:8000/posts'

const initialState = {
    loading: false,
    error: '',
    success: false
}

export const createPost = createAsyncThunk(
    'posts/createPost',
    async (postData) => {
        let formData = new FormData()
        if(postData.media) {
            formData.append('media', postData.media)
        }
        formData.append('userID', postData.userID)
        if(postData.text) formData.append('text', postData.text)
        const response = await axios.post(url, formData, {headers: {'Content-Type': 'multipart/form-data'}})
        if(!(response.status === 200)) {
            return Promise.reject(new Error(response.data))
        }
        return response.data
    }
)


export const newPostSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        newPostReset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPost.pending, (state) => {
                state.loading = true
                state.success = false
            })
            .addCase(createPost.fulfilled, (state) => {
                state.loading = false
                state.success = true
            })
            .addCase(createPost.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }

})

export default newPostSlice.reducer