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
    <div className="App">
      <div className="container">
        <form onSubmit={handleSubmit} className="white">
          <h5>{isSignup ? 'Sign Up' : 'Log In'}</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              required
              autoComplete="current-username"
              onChange={(e) =>
                dispatch(changeUserForm({email: e.target.value}))
              }
              value={email}
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
              onChange={(e) =>
                dispatch(changeUserForm({password: e.target.value}))
              }
              autoComplete="current-password"
              value={password}
            />
          </div>
          <div className="input-field row">
            <button className="btn black col s12 m3" type="submit">
              {isSignup ? 'Sign Up' : 'Log In'}
            </button>
            <button
              className="btn black right col s12 m5"
              type="button"
              onClick={() => dispatch(toggleIsSignup())}
            >
              {isSignup ? 'Have an account?' : `Don't have an account?`}
            </button>
          </div>
          <div className="red-text left">{error ? error.message : null}</div>
        </form>
      </div>
    </div>
  )
}
