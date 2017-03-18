import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import GifsStore from './stores/GifsStore'

// Fetch a random gif from giphy and push it
// onto our store. The app will observe the store
// mutation and rerender the component.
GifsStore.add()

ReactDOM.render(
  <App GifsStore={GifsStore} />,
  document.getElementById('root')
)
