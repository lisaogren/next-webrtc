import { observable, action, computed } from 'mobx'

import SimplePeer from 'simple-peer'

import api from 'utils/api'

class Signal {
  io = null
  peer = null
  @observable streams = {
    mine: null,
    theirs: null
  }

  @observable username = null
  @observable connected = false
  @observable users = []
  @observable signals = []

  @computed get src () {
    return (type) => {
      if (!this.streams[type]) return

      return window.URL.createObjectURL(this.streams[type])
    }
  }

  init () {
    api.setup()

    api.io.sails.url = window.location.origin

    api.io.socket.on('connect', this.connect)
    api.io.socket.on('disconnect', this.disconnect)
    api.io.socket.on('signal', this.signal)

    this.getList()
  }

  @action connect = () => {
    console.debug('[signal] Connected')
    this.connected = true
  }

  @action disconnect = () => {
    console.debug('[signal] Disconnected')
    this.connected = false
  }

  @action login = ({ username }) => {
    console.debug('[signal] Login using', username)

    const data = { username }

    api.socket.login({ data }).then(data => {
      this.username = data.username
    })
  }

  @action getList = () => {
    console.debug('[signal] Getting users list')

    api.socket.list().then(data => {
      this.users = data
    })
  }

  @action send = (data) => {
    api.socket.signal({ data }).then(() => {
      console.debug('sent signal data', data)
    })
  }

  signal = (data) => {
    console.debug('[signal] Got `signal` event', data)

    if (!this.peer) this.createPeer()

    this.peer.signal(data)
  }

  createPeer = (options) => {
    this.peer = new SimplePeer(options)

    this.streams.mine = options.stream

    this.peer.on('signal', data => signal.send(data))
    this.peer.on('stream', stream => { this.streams.theirs = stream })
  }
}

const signal = new Signal()

export { signal }
