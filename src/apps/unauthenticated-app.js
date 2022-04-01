import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import React from 'react'
import {auth} from 'firebase-config'

export function UnauthenticatedApp() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isSignup, setIsSignup] = React.useState(true)
  const [error, setError] = React.useState(null)

  const handleSubmit = async (e) => {
    if (!email.length || !password.length) return
    e.preventDefault()
    if (isSignup) {
      // signup
      try {
        await createUserWithEmailAndPassword(auth, email, password)
      } catch (error) {
        setError(error)
      }
    } else {
      // login
      try {
        await signInWithEmailAndPassword(auth, email, password)
      } catch (error) {
        if (error.message.includes('auth/user-not-found')) {
          setError(error)
        }
      }
    }
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
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1" type="submit">
              {isSignup ? 'Sign Up' : 'Log In'}
            </button>
            <button
              className="btn btn-small secondary right"
              type="button"
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup
                ? 'Already have an account? Log in'
                : "Don't have an account? Signup"}
            </button>
          </div>
          <div className="red-text left">{error ? error.message : null}</div>
        </form>
      </div>
    </div>
  )
}
