import {auth} from 'firebase-config'
import {signOut} from 'firebase/auth'
import {NavLink} from 'react-router-dom'

export function AuthenticatedLinks({user}) {
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
        <NavLink to="/" className="btn btn-floating pink lighten-1">
          {user?.email}
        </NavLink>
      </li>
    </ul>
  )
}
