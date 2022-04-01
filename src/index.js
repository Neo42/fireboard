import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import {BrowserRouter as Router} from 'react-router-dom'
import 'materialize-css/dist/css/materialize.min.css'
import './index.css'
import App from './apps/app'
import {AuthProvider} from 'contexts/auth'

const rootNode = document.getElementById('root')
const root = ReactDOMClient.createRoot(rootNode)
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>,
)
