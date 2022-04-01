import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import 'materialize-css/dist/css/materialize.min.css'
import './index.css'
import App from './apps/app'
import {BrowserRouter as Router} from 'react-router-dom'

const rootNode = document.getElementById('root')
const root = ReactDOMClient.createRoot(rootNode)
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
)
