import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    friend: '',
    loading: false,
    conversation: null,
    messageList: [],
}

export const conversationSlice = createSlice({
    name: 'conversation',
    initialState,
    reducers: {
        resetConversation: () => initialState
    }
})


export default conversationSlice.reducer