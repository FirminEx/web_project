import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const url = 'http://localhost:8000/message/'

const initialState = {
    loading: false,
    error: '',
    success: false,
}

export const createMessage = createAsyncThunk(
    'message/createMessage',
    async (postData) => {
        let formData = new FormData()
        if(postData.media) {
            formData.append('media', postData.media)
        }
        formData.append('sender', postData.sender)
        formData.append('receiver', postData.receiver)
        if(postData.text) formData.append('text', postData.text)
        const response = await axios.post(url + 'createMessage', formData, {headers: {'Content-Type': 'multipart/form-data'}})
        if(!(response.status === 200)) {
            return Promise.reject(new Error(response.data))
        }
        return response.data
    }
)


export const newMessageSlice = createSlice({
    name: 'newMessage',
    initialState,
    reducers: {
        newMessageReset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createMessage.pending, (state) => {
                state.loading = true
                state.success = false
                state.error = ''
            })
            .addCase(createMessage.fulfilled, (state) => {
                state.loading = false
                state.success = true
            })
            .addCase(createMessage.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }

})

export default newMessageSlice.reducer