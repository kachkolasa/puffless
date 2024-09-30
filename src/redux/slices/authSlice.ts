import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface authState {
    isLoggedIn: boolean
}

const initialState: authState = {
    isLoggedIn: false
}

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        login: (state) => {
            state.isLoggedIn = true
        },
        logout: (state) => {
            state.isLoggedIn = false
        }
    },
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer