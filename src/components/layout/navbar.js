import {Link} from 'react-router-dom'
import {AuthenticatedLinks} from './authenticated-links'
import {UnauthenticatedLinks} from './unauthenticated-links'

export function NavBar() {
  return (
    <nav className="nav-wrapper grey darken-3">
      <div className="container">
        <Link to="/" className="brand-logo">
          Fireboard
        </Link>
        <AuthenticatedLinks />
        <UnauthenticatedLinks />
      </div>
    </nav>
  )
}
