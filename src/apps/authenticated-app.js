import {Dashboard, NewProduct, ProductDetails} from 'components'
import {Route, Routes} from 'react-router-dom'

export function AuthenticatedApp() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/product/:productId" element={<ProductDetails />} />
      <Route path="/new" element={<NewProduct />} />
    </Routes>
  )
}
