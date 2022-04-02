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
      await userAction(auth, email, password)
    } catch ({message}) {
      dispatch(receivedError({message}))
    }
    navigate('/')
  }

  return (
    <div className="App">
      <div className="container">
        <form onSubmit={handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">
            {isSignup ? 'Sign Up' : 'Log In'}
          </h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              autoComplete="current-username"
              onChange={(e) =>
                dispatch(changeUserForm({email: e.target.value}))
              }
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) =>
                dispatch(changeUserForm({password: e.target.value}))
              }
              autoComplete="current-password"
            />
          </div>
          <div className="input-field row">
            <button className="btn black col s12 m3" type="submit">
              {isSignup ? 'Sign Up' : 'Log In'}
            </button>
            <button
              className="btn black right col s12 m3"
              type="button"
              onClick={() => dispatch(toggleIsSignup())}
            >
              {isSignup ? 'Log in' : 'Sign up'}
            </button>
          </div>
          <div className="red-text left">{error ? error.message : null}</div>
        </form>
      </div>
    </div>
  )
}
