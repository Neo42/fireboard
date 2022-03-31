import {NavLink} from 'react-router-dom'

export function UnauthenticatedLinks() {
  return (
    <ul className="right">
      <li>
        <NavLink to="/">Sign up</NavLink>
      </li>
      <li>
        <NavLink to="/">Log In</NavLink>
      </li>
    </ul>
  )
}
