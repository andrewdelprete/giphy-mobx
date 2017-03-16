import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { observable } from 'mobx'
import { Provider } from 'mobx-react'
import { getRandomGif } from './helpers/gifs'

// Our Gif store observable
const gifs = observable([])

// Fetch a random gif from giphy and push it
// onto our store The app will observe the store
// mutation and rerender the component.
getRandomGif().then(gif => gifs.push(gif))

ReactDOM.render(
  <Provider gifs={gifs}>
    <App />
  </Provider>,
  document.getElementById('root')
)
