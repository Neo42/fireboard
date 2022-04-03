import {signOut} from 'firebase/auth'
import {useDispatch, useSelector} from 'react-redux'
import {Link, NavLink} from 'react-router-dom'
import {Menu, X} from 'react-feather'
import React from 'react'
import {changeUserForm, receivedError} from 'features/auth-slice'
import {auth} from 'firebase-config'

export function NavBar() {
  const dispatch = useDispatch()
  const {status} = useSelector((state) => state.auth)
  const [isOpen, setIsOpen] = React.useState(false)

  const handleLogout = async (e) => {
    e.preventDefault()
    try {
      dispatch(changeUserForm({email: '', password: ''}))
      await signOut(auth)
    } catch ({message}) {
      dispatch(receivedError({message}))
    }
  }

  const isLoggedIn = status === 'logged in'

  return (
    <header className="bg-black sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-3">
      <div className="flex items-center justify-between px-4 py-3 sm:p-0">
        <div>
          <Link className="block text-3xl text-white" to="/">
            Fireboard
          </Link>
        </div>

        {isLoggedIn ? (
          <div className="sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="block text-gray-400 hover:text-white focus:text-white focus:outline-none"
            >
              {!isOpen ? (
                <Menu className="w-6 h-6 fill-current" />
              ) : (
                <X className="w-6 h-6 fill-current" />
              )}
            </button>
          </div>
        ) : null}
      </div>

      {isLoggedIn ? (
        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } px-2 py-2 pb-4 sm:flex sm:p-0`}
        >
          <NavLink
            className="block px-2 py-1 font-semibold text-white rounded hover:bg-gray-800 sm:mt-0 sm:ml-2"
            to="/new"
          >
            New Product
          </NavLink>
          <NavLink
            className="block px-2 py-1 mt-1 font-semibold text-white rounded hover:bg-gray-800 sm:mt-0 sm:ml-2"
            to="/"
            onClick={handleLogout}
          >
            Log Out
          </NavLink>
        </div>
      ) : null}
    </header>
  )
}
