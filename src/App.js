import React, { Component } from 'react';
import {observer, inject} from "mobx-react"
import {action, extendObservable} from "mobx"
import {getRandomGif} from './helpers/gifs'
import remove from 'lodash/remove'
import Button from './Button'
import Gif from './Gif'

// Can't test using @decorators :/
// https://mobx.js.org/best/decorators.html
// @inject('gifs')
// @observer
const App = inject("gifs")(observer(class App extends Component {
  constructor() {
    super()
    extendObservable(this, {
      add: () => {
        action(getRandomGif().then(gif => this.props.gifs.push(gif)))
      },
      removeItem: (gif) => {
        action(remove(this.props.gifs, gif))
      },
      removeLast: () => {
        action(this.props.gifs.pop())
      }
    })
  }

  render() {
    const { gifs } = this.props
    return (
      <div className="App">
        { gifs.length > 0 &&
          gifs.map((gif, i) => {
            return <Gif
              key={i}
              onClick={() => this.removeItem(gif) }
              style={{ backgroundImage: `url(${gif.images.fixed_width.url})` }}
            />
          }
        )}
        <div style={{ clear: 'both' }}>
          <Button id="add" primary style={{ margin: 0 }} onClick={this.add}>Add Gif</Button>
          <Button onClick={this.removeLast}>Remove Last</Button>
        </div>
      </div>
    )
  }
}))

export default App

