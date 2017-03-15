import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import App from './App';
import {observable} from "mobx"
import {Provider} from "mobx-react"
import { getRandomGif } from './helpers/gifs'

// Our Gif store observable
const gifs = observable([])

getRandomGif().then(gif => gifs.push(gif))

ReactDOM.render(
  <Provider gifs={gifs}>
    <App />
  </Provider>,
  document.getElementById('root')
);
