import React from 'react'

const AuthContext = React.createContext(null)

export const AuthProvider = ({children}) => {
  const [user, setUser] = React.useState(null)
  return <AuthContext.Provider value={{user, setUser}} children={children} />
}

export function useAuthContext() {
  const context = React.useContext(AuthContext)
  if (!context) throw new Error('Not in the AuthContext.')
  return React.useContext(AuthContext)
}
