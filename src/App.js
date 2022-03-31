import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {Dashboard} from 'components/dashboard/dashboard'
import {NavBar} from 'components/layout/navbar'
import {ProductDetails} from 'components/products/details'

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
