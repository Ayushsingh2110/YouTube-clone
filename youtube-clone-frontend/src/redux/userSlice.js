import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    loading: false,
    error: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
        },
        loginFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        logout: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        },
        subscription: (state, action) => {
            state.currentUser.subscribedUsers.includes(action.payload)
                ? state.currentUser.subscribedUsers.splice(
                    state.currentUser.subscribedUsers.findIndex(
                        channel_id => channel_id === action.payload
                    )
                )
                : state.currentUser.subscribedUsers.push(action.payload)
        }
    }
})

export const { loginStart, loginSuccess, loginFailure, logout, subscription } = userSlice.actions;
export default userSlice.reducer;