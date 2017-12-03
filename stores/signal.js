import { observable, action } from 'mobx'

import client from 'socket.io-client'
import sailsIO from 'sails.io.js'

import api from 'utils/api'

class Signal {
  io = null

  @observable username = null
  @observable connected = false
  @observable signals = []

  init () {
    this.io = sailsIO(client)
    this.io.sails.url = 'http://localhost:1337'

    this.io.socket.on('connect', this.connect)
    this.io.socket.on('disconnect', this.disconnect)
  }

  @action connect = () => {
    console.debug('[signal] Connected')
    this.connected = true
  }

  @action disconnect = () => {
    console.debug('[signal] Disconnected')
    this.connected = false
  }

  @action login = async ({ username }) => {
    console.debug('[signal] Login using', username)

    this.io.socket.post('/api/login', { username }, (data, response) => {
      console.debug('[signal] Login response', response)

      if (response.statusCode === 200) this.username = data.username
    })
  }
}

const signal = new Signal()

export { signal }
