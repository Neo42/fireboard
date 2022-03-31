import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {
  Login,
  Signup,
  NavBar,
  Dashboard,
  NewProduct,
  ProductDetails,
} from 'components'

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/new" element={<NewProduct />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
