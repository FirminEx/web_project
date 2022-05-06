import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    searchResults: [],
    error: '',
}

const url = 'http://localhost:8000/users/'


export const searchUserLike = createAsyncThunk(
    'profile/searchUserLike',
    async (query) => {
        const response = await axios.post(url + 'findUsersLike', {query: query})
            .catch(err => Promise.reject(err.message))
        if(!(response.status === 200)) return Promise.reject(new Error(response.data))
        return response.data;
    }
)

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        resetSearch: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchUserLike.pending, (state) => {
                state.loading = true
                state.error = ''
                state.searchResults = []
            })
            .addCase(searchUserLike.fulfilled, (state, action) => {
                state.loading = false
                state.searchResults = action.payload
            })
            .addCase(searchUserLike.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export default searchSlice.reducer