import React from 'react'
import {onAuthStateChanged} from 'firebase/auth'
import {AuthenticatedApp} from 'apps/authenticated-app'
import {UnauthenticatedApp} from 'apps/unauthenticated-app'
import {auth} from 'firebase-config'

function App() {
  const [user, setUser] = React.useState(null)
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
  })
  return (
    <div className="App">
      {user ? <AuthenticatedApp user={user} /> : <UnauthenticatedApp />}
    </div>
  )
}

export default App
