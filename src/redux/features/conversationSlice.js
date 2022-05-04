import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    friend: '',
    loading: false,
    conversation: null,
    messageList: [],
    error: ''
}

const url = 'http://localhost:8000/conversation/'

export const fetchConversation = createAsyncThunk(
    'conversation/fetchConversation',
    async (parameters ) => {
        const {friendID, userID} = parameters;
        if(!userID) return Promise.reject(new Error('Not connected'))
        console.log(userID)
        const response = await axios.post(url + 'getConversation', {user1: friendID, user2: userID})
        if(!response) return Promise.reject(new Error(response.data))
        return response.data
    }
)

//TODO convert conversation into message list + friend name

export const conversationSlice = createSlice({
    name: 'conversation',
    initialState,
    reducers: {
        resetConversation: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchConversation.pending, (state) => {
                state.loading = true
                state.friend = ''
                state.conversation = null
                state.messageList = []
                state.error = ''
            })
            .addCase(fetchConversation.fulfilled, (state, action) => {
                state.loading = false
                state.conversation = action.payload
            })
            .addCase(fetchConversation.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})


export default conversationSlice.reducer