import React from 'react';
import {observer} from "mobx-react"
import Button from './Button'
import Gif from './Gif'

const App = observer(({ GifsStore }) => (
  <div className="App">
    <div>
      { GifsStore.gifs.length > 0 &&
          GifsStore.gifs.map((gif, i) =>
          <Gif
            key={i}
            onClick={() => GifsStore.remove(gif)}
            style={{ backgroundImage: `url(${gif.images.fixed_width.url})` }}
          />
        )
      }
    </div>
    <div style={{ clear: 'both' }}>
      <Button id="add" primary style={{ margin: 0 }} onClick={GifsStore.add}>Add Gif</Button>
      <Button id="removeLast" onClick={GifsStore.removeLast}>Remove Last</Button>
    </div>
  </div>
))

export default App