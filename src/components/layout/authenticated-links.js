import {useAuthContext} from 'contexts/auth'
import {auth} from 'firebase-config'
import {signOut} from 'firebase/auth'
import React from 'react'
import {NavLink} from 'react-router-dom'

export function AuthenticatedLinks() {
  const {user} = useAuthContext()

  const handleLogout = async (e) => {
    e.preventDefault()
    await signOut(auth)
  }

  return (
    <ul className="right">
      <li>
        <NavLink to="/new">New Product</NavLink>
      </li>
      <li>
        <NavLink to="/" onClick={handleLogout}>
          Log Out
        </NavLink>
      </li>
      <li>
        <NavLink to="/">{user?.email}</NavLink>
      </li>
    </ul>
  )
}
