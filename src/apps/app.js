import React from 'react'
import {onAuthStateChanged} from 'firebase/auth'
import {AuthenticatedApp} from 'apps/authenticated-app'
import {UnauthenticatedApp} from 'apps/unauthenticated-app'
import {auth} from 'firebase-config'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import {receivedUser} from 'features/auth-slice'

function App() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  onAuthStateChanged(auth, (currentUser) => dispatch(receivedUser(currentUser)))

  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  )
}

export default App
