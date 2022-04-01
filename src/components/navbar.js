import {auth} from 'firebase-config'
import {signOut} from 'firebase/auth'
import {Link, NavLink} from 'react-router-dom'

export function NavBar({children}) {
  const handleLogout = async (e) => {
    e.preventDefault()
    await signOut(auth)
  }

  return (
    <nav className="nav-wrapper grey darken-3">
      <div className="container">
        <Link to="/" className="brand-logo left">
          Fireboard
        </Link>
        <ul className="mobile-nav right">
          <li>
            <NavLink to="/new">New Product</NavLink>
          </li>
          <li>
            <NavLink to="/" onClick={handleLogout}>
              Log Out
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}
