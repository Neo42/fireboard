import React from 'react'
import {onAuthStateChanged} from 'firebase/auth'
import {AuthenticatedApp} from 'apps/authenticated-app'
import {UnauthenticatedApp} from 'apps/unauthenticated-app'
import {auth} from 'firebase-config'
import {useAuthContext} from 'contexts/auth'

function App() {
  const {user, setUser} = useAuthContext()
  onAuthStateChanged(auth, (currentUser) => setUser(currentUser))
  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  )
}

export default App
