import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {Dashboard} from './components/dashboard/dashboard'
import {NavBar} from './components/layout/navbar'

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
