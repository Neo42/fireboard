import React from 'react'
import {onAuthStateChanged} from 'firebase/auth'
import {AuthenticatedApp} from 'apps/authenticated-app'
import {UnauthenticatedApp} from 'apps/unauthenticated-app'
import {auth} from 'firebase-config'
import {useDispatch, useSelector} from 'react-redux'
import {changeUserForm, logout, receivedUser} from 'features/auth-slice'

function App() {
  const dispatch = useDispatch()
  const {status} = useSelector((state) => state.auth)

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) dispatch(receivedUser())
    else dispatch(logout())
  })

  React.useEffect(() => {
    if (status === 'logged in' || status === 'logged out')
      dispatch(changeUserForm({email: '', password: ''}))
  }, [dispatch, status])

  return (
    <div className="App">
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
