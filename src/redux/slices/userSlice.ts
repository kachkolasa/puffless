import { createSlice } from '@reduxjs/toolkit'

export interface userState {
    isKYCDone: boolean,
    userGoal: any,
    lastCigarette: any
}

const initialState: userState = {
    isKYCDone: false,
    userGoal: {},
    lastCigarette: {}
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setKYC: (state, action) => {
            state.isKYCDone = action.payload
        },
        setUserGoal: (state, action) => {
            state.userGoal = action.payload
        },
        setLastCigarette: (state, action) => {
            state.lastCigarette = action.payload
        },
    },
})

export const { setKYC } = userSlice.actions;

export default userSlice.reducer