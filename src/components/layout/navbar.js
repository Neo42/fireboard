import {Link} from 'react-router-dom'

export function NavBar({children}) {
  return (
    <nav className="nav-wrapper grey darken-3">
      <div className="container">
        <Link to="/" className="brand-logo">
          Fireboard
        </Link>
        {children}
      </div>
    </nav>
  )
}
