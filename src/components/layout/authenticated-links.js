import {NavLink} from 'react-router-dom'

export function AuthenticatedLinks() {
  return (
    <ul className="right">
      <li>
        <NavLink to="/new">New Product</NavLink>
      </li>
      <li>
        <NavLink to="/">Log Out</NavLink>
      </li>
      <li>
        <NavLink to="/" className="btn btn-floating pink lighten-1">
          N
        </NavLink>
      </li>
    </ul>
  )
}
