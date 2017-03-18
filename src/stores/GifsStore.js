import { observable, action } from "mobx"
import {getRandomGif} from '../helpers/gifs'
import remove from 'lodash/remove'

class GifsStore {
  @observable gifs = []

  @action.bound add () {
    getRandomGif().then(gif => this.gifs.push(gif))
  }

  @action.bound remove (gif) {
    remove(this.gifs, gif)
  }

  @action.bound removeLast () {
    this.gifs.pop()
  }
}

export default new GifsStore()
