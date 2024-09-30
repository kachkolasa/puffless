import { createSlice } from '@reduxjs/toolkit'

export interface userState {
    isKYCDone: boolean
}

const initialState: userState = {
    isKYCDone: false
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setKYC: (state, action) => {
            state.isKYCDone = action.payload
        }
    },
})

export const { setKYC } = userSlice.actions;

export default userSlice.reducer