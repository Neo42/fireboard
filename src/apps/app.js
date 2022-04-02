import React from 'react'
import {onAuthStateChanged} from 'firebase/auth'
import {useDispatch, useSelector} from 'react-redux'
import {AuthenticatedApp} from 'apps/authenticated-app'
import {UnauthenticatedApp} from 'apps/unauthenticated-app'
import {auth} from 'firebase-config'
import {login, logout} from 'features/auth-slice'
import {NavBar} from 'components'

function App() {
  const dispatch = useDispatch()
  const {status} = useSelector((state) => state.auth)

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) dispatch(login())
    else dispatch(logout())
  })

  return (
    <div className="App">
      <NavBar />
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : status === 'logged in' ? (
        <AuthenticatedApp />
      ) : (
        <UnauthenticatedApp />
      )}
    </div>
  )
}

export default App
