import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  uid: null,
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
      state.error = null
      state.isSignup = !state.isSignup
    },
    receivedUser(state, action) {
      state.uid = action.payload
    },
    receivedError(state, action) {
      state.error = action.payload
    },
    login(state, action) {
      state.error = null
      state.status = 'logged in'
    },
    logout(state, action) {
      state.uid = null
      state.status = 'logged out'
    },
    changeUserForm(state, action) {
      state.error = null
      state.userForm = {...state.userForm, ...action.payload}
    },
  },
})

export const {
  toggleIsSignup,
  receivedUser,
  receivedError,
  logout,
  login,
  changeUserForm,
} = authSlice.actions

export default authSlice.reducer
