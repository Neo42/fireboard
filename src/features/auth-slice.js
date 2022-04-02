import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  userForm: {
    email: '',
    password: '',
  },
  isSignup: false,
  error: null,
  status: 'loading',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toggleIsSignup(state, action) {
      state.isSignup = !state.isSignup
    },
    receivedUser(state, action) {
      state.error = null
      state.status = 'logged in'
    },
    receivedError(state, action) {
      state.error = action.payload
    },
    logout(state, action) {
      state.status = 'logged out'
    },
    changeUserForm(state, action) {
      state.userForm = {...state.userForm, ...action.payload}
    },
  },
})

export const {
  toggleIsSignup,
  receivedUser,
  receivedError,
  logout,
  changeUserForm,
} = authSlice.actions

export default authSlice.reducer
