import React from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import {auth} from 'firebase-config'
import {useNavigate} from 'react-router-dom'

export function UnauthenticatedApp() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState(null)
  const [isSignup, setIsSignup] = React.useState(true)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.length || !password.length) {
      alert('Required field missing.')
      return
    }
    const userAction = isSignup
      ? createUserWithEmailAndPassword
      : signInWithEmailAndPassword
    // signup
    try {
      await userAction(auth, email, password)
    } catch (error) {
      setError(error)
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
          <div className="input-field row">
            <button className="btn lighten-1 col s12 m3" type="submit">
              {isSignup ? 'Sign Up' : 'Log In'}
            </button>
            <button
              className="btn btn right col s12 m3"
              type="button"
              onClick={() => setIsSignup(!isSignup)}
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
