import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  user: {},
  isSignup: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    receivedUser(state, action) {
      state.user = action.payload
    },
  },
})

export const {receivedUser} = authSlice.actions

export default authSlice.reducer
