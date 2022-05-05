import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    logged: false,
    display: 2, //explore
}

export const displaySlice = createSlice({
    name: 'display',
    initialState,
    reducers: {
        loggedIn: (state) => {
            return {
                ...state,
                logged: true,
                display: 1,
            }
        },
        loggedOut: () => initialState,
        goToDiscover: (state) => {
            return {
                ...state,
                display: 2
            }
        },
        goToFriendsPosts: (state) => {
            if(state.logged) {
                return {
                    ...state,
                    display: 1
                }
            }
        },
        goToConversation: (state) => {
            return {
                ...state,
                display: 3
            }

        },
        goToProfile: (state) => {
            return {
                ...state,
                display: 4
            }
        }
    },

})

export default displaySlice.reducer