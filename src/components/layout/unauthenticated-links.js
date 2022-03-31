import {NavLink} from 'react-router-dom'

export function UnauthenticatedLinks() {
  return (
    <ul className="right">
      <li>
        <NavLink to="/signup">Sign up</NavLink>
      </li>
      <li>
        <NavLink to="/login">Log In</NavLink>
      </li>
    </ul>
  )
}
