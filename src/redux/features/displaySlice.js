import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    logged: false,
    display: 2, //explore
}

export const displaySlice = createSlice({
    name: 'display',
    initialState,
    reducers: {
        loggedIn: () => {
            return {
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
        goToSubscription: (state) => {
            if(state.logged) {
                return {
                    ...state,
                    display: 1
                }
            }
        }
    },

})

export default displaySlice.reducer