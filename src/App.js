import React, { Component } from 'react';
import {observer, inject} from "mobx-react"
import {action} from "mobx"
import {getRandomGif} from './helpers/gifs'
import remove from 'lodash/remove'
import Button from './Button'
import Gif from './Gif'

@inject("gifs")
@observer
class App extends Component {
  @action.bound add() {
    getRandomGif().then(gif => this.props.gifs.push(gif))
  }

  @action.bound remove(gif) {
    remove(this.props.gifs, gif)
  }

  @action.bound removeLast() {
    this.props.gifs.pop()
  }

  render() {
    const { gifs } = this.props
    return (
      <div className="App">
        { gifs.length > 0 &&
          gifs.map((gif, i) => {
            return <Gif
              key={i}
              onClick={() => this.remove(gif) }
              style={{ backgroundImage: `url(${gif.images.fixed_width.url}` }}
            />
          }
        )}
        <div style={{ clear: 'both' }}>
          <Button primary style={{ margin: 0 }} onClick={this.add}>Add Gif</Button>
          <Button onClick={this.removeLast}>Remove Last</Button>
        </div>
      </div>
    );
  }
}

export default App;

