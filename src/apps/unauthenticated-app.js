import React from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import {auth} from 'firebase-config'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {
  changeUserForm,
  receivedError,
  receivedUser,
  toggleIsSignup,
} from 'features/auth-slice'

export function UnauthenticatedApp() {
  const dispatch = useDispatch()
  const {
    userForm: {email, password},
    isSignup,
    error,
  } = useSelector((state) => state.auth)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.length || !password.length) {
      dispatch(receivedError({message: 'Required field missing.'}))
      return
    }

    const userAction = isSignup
      ? createUserWithEmailAndPassword
      : signInWithEmailAndPassword

    try {
      const {
        user: {uid},
      } = await userAction(auth, email, password)
      dispatch(receivedUser(uid))
      dispatch(changeUserForm({email: '', password: ''}))
    } catch ({message}) {
      dispatch(receivedError({message}))
    }
    navigate('/')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h5>{isSignup ? 'Sign Up' : 'Log In'}</h5>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            autoComplete="current-username"
            onChange={(e) => dispatch(changeUserForm({email: e.target.value}))}
            value={email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) =>
              dispatch(changeUserForm({password: e.target.value}))
            }
            autoComplete="current-password"
            value={password}
          />
        </div>
        <div>
          <button type="submit">{isSignup ? 'Sign Up' : 'Log In'}</button>
          <button type="button" onClick={() => dispatch(toggleIsSignup())}>
            {isSignup ? 'Have an account?' : `Don't have an account?`}
          </button>
        </div>
        <div>{error ? error.message : null}</div>
      </form>
    </div>
  )
}
