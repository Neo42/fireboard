import React from 'react'

export function Signup() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({email, password, firstName, lastName})
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="white">
        <h5 className="grey-text text-darken-3">Sign Up</h5>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="input-field">
          <button className="btn pink lighten-1 z-depth-0">Sign Up</button>
        </div>
      </form>
    </div>
  )
}
