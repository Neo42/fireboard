import {signOut} from 'firebase/auth'
import {useDispatch, useSelector} from 'react-redux'
import {Link, NavLink} from 'react-router-dom'
import {changeUserForm, receivedError} from 'features/auth-slice'
import {auth} from 'firebase-config'

export function NavBar() {
  const dispatch = useDispatch()
  const {status} = useSelector((state) => state.auth)

  const handleLogout = async (e) => {
    e.preventDefault()
    try {
      dispatch(changeUserForm({email: '', password: ''}))
      await signOut(auth)
    } catch ({message}) {
      dispatch(receivedError({message}))
    }
  }

  return (
    <nav className="nav-wrapper black">
      <div className="container">
        <Link to="/" className="brand-logo left">
          Fireboard
        </Link>
        {status === 'logged in' ? (
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
        ) : null}
      </div>
    </nav>
  )
}
