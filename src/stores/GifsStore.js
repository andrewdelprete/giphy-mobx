import { observable } from "mobx"
import {getRandomGif} from '../helpers/gifs'
import remove from 'lodash/remove'

class GifsStore {
  constructor() {
    this.gifs = observable([])
    this.add = this.add.bind(this)
    this.remove = this.remove.bind(this)
    this.removeLast = this.removeLast.bind(this)
  }

  add () {
    getRandomGif().then(gif => this.gifs.push(gif))
  }

  remove (gif) {
    remove(this.gifs, gif)
  }

  removeLast () {
    this.gifs.pop()
  }
}

export default new GifsStore()
