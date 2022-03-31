import {NavLink} from 'react-router-dom'

export function SignedInLinks() {
  return (
    <ul className="right">
      <li>
        <NavLink to="/">New Item</NavLink>
      </li>
      <li>
        <NavLink to="/">Log Out</NavLink>
      </li>
      <li>
        <NavLink to="/" className="btn btn-floating pink lighten-1">
          NN
        </NavLink>
      </li>
    </ul>
  )
}
