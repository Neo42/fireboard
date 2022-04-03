import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import {BrowserRouter as Router} from 'react-router-dom'

import './index.css'
import App from './apps/app'

import {Provider} from 'react-redux'
import {store} from 'store'

const rootNode = document.getElementById('root')
const root = ReactDOMClient.createRoot(rootNode)

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </Provider>,
)
