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
    <div className="flex flex-col justify-center min-h-screen px-6 py-12 bg-gray-100 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 class="mx-auto h-12 w-auto text-5xl font-extrabold text-center text-yellow-400">
          Fireboard
        </h1>
        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
          {isSignup ? 'Create your account' : 'Log in with your account'}
        </h2>
        <p className="mt-2 text-sm text-center text-gray-600 max-w">
          {isSignup ? 'Have an account?' : `Don't have an account?`}{' '}
          <button
            href="#"
            className="font-medium text-yellow-500 hover:text-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onClick={(e) => {
              e.preventDefault()
              dispatch(toggleIsSignup())
            }}
          >
            {isSignup ? 'Log in' : 'Sign up'}
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-6 py-8 bg-white shadow sm:px-10">
          <form
            className="mb-0 space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div>
              <p className="font-medium text-red-500">
                {error
                  ? error.message.includes('auth/email-already-in-use')
                    ? 'Error: This email has been used.'
                    : error.message.includes('auth/email-already-in-use')
                    ? 'Error: Password should be at least 6 characters.'
                    : error.message.includes('auth/user-not-found')
                    ? 'Error: Incorrect email or password.'
                    : error.message
                  : null}
              </p>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  className="w-full border-gray-300 shadow-sm focus:border-yellow-400 focus:ring-yellow-400"
                  onChange={(e) =>
                    dispatch(changeUserForm({email: e.target.value}))
                  }
                  value={email}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  className="w-full border-gray-300 shadow-sm focus:border-yellow-400 focus:ring-yellow-400"
                  onChange={(e) =>
                    dispatch(changeUserForm({password: e.target.value}))
                  }
                  value={password}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black border border-transparent shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
              >
                {isSignup ? 'Sign up' : 'Log in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
