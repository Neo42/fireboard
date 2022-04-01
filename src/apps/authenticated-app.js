import {
  AuthenticatedLinks,
  Dashboard,
  NavBar,
  NewProduct,
  ProductDetails,
} from 'components'
import {Route, Routes} from 'react-router-dom'

export function AuthenticatedApp({user}) {
  return (
    <>
      <NavBar>
        <AuthenticatedLinks user={user} />
      </NavBar>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/new" element={<NewProduct />} />
      </Routes>
    </>
  )
}
