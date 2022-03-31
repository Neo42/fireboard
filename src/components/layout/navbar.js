import {Link} from 'react-router-dom'
import {SignedInLinks} from './signed-in-links'
import {SignedOutLinks} from './signed-out-links'

export function NavBar() {
  return (
    <nav className="nav-wrapper grey darken-3">
      <div className="container">
        <Link to="/" className="brand-logo">
          Fireboard
        </Link>
        <SignedInLinks />
        <SignedOutLinks />
      </div>
    </nav>
  )
}
