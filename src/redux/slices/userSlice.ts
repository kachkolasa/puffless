import { createSlice } from '@reduxjs/toolkit'

export interface userState {
    isKYCDone: boolean,
    userGoal: any,
    lastCigarette: any,
    totalCigarettes: number,
    totalDays?: number
}

const initialState: userState = {
    isKYCDone: false,
    userGoal: {},
    lastCigarette: {},
    totalCigarettes: 0,
    totalDays: 0
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
        setTotalCigarettes: (state, action) => {
            state.totalCigarettes = action.payload
        },
        setTotalDays: (state, action) => {
            state.totalDays = action.payload
        }
    },
})

export const { setKYC } = userSlice.actions;

export default userSlice.reducer