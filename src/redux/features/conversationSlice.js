import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    friend: '',
    loading: false,
    conversation: null,
    messageList: [],
    errorConversation: '',
    errorMessages: '',
    errorFriend: ''
}

const url = 'http://localhost:8000/conversation/'
const urlMessage = 'http://localhost:8000/message/'

export const fetchConversation = createAsyncThunk(
    'conversation/fetchConversation',
    async (parameters, thunkApi ) => {
        const {friendID, userID} = parameters;
        if(!userID) return Promise.reject(new Error('Not connected'))
        let response = await axios.post(url + 'getConversation', {user1: friendID, user2: userID})
        if(!response.data) {
            response = await axios.post(url + 'createConversation', {user1: friendID, user2: userID})
        }
        if(!response.data) return Promise.reject(new Error('Could not find the conversation'))
        await thunkApi.dispatch(fetchMessages(response.data))
        return response.data
    }
)

export const fetchMessages = createAsyncThunk(
    'conversation/fetchMessages',
    async (conversation) => {
        if(!conversation) return Promise.reject(new Error('No conversation'))
        let messages = []
        //console.log(conversation)
        for(let i = 0 ; i < conversation.messages.length ; i++) {
            const message = await axios.post(urlMessage + 'getMessage', {id: conversation.messages[i]})
            if(!message) return Promise.reject(new Error('Message not found'))
            messages = [].concat(messages, message.data)
        }
        return messages
    }
)

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
                state.errorConversation = ''
            })
            .addCase(fetchConversation.fulfilled, (state, action) => {
                state.loading = false
                state.conversation = action.payload
            })
            .addCase(fetchConversation.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(fetchMessages.pending, (state) => {
                state.loading = true
                state.messageList = []
                state.errorMessages = ''
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                state.loading = false
                state.messageList = action.payload
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                state.loading = false
                state.errorMessages = action.payload
            })
    }
})


export default conversationSlice.reducer