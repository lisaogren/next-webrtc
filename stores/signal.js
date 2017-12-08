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
    api.io.socket.on('join', this.join)

    this.getUserMedia()
  }

  // Actions

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
    data = { data }

    api.socket.signal({ data }).then(() => {
      console.debug('sent signal data', data)
    })
  }

  @action join = (data) => {
    console.debug('[signal] Received join event!', data)

    this.createPeer({ initiator: true })
  }

  // Helpers

  signal = (data) => {
    console.debug('[signal] Got `signal` event', data)

    if (!this.peer) {
      this.createPeer({ initiator: false })
    }

    this.peer.signal(data)
  }

  createPeer = ({ initiator }) => {
    this.peer = new SimplePeer({ initiator, stream: this.streams.mine })

    this.peer.on('signal', data => signal.send(data))
    this.peer.on('stream', stream => {
      console.debug('[signal] Peer stream event!')

      this.streams.theirs = stream
    })
  }

  getUserMedia = () => {
    return navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => { this.streams.mine = stream })
      .catch((...args) => {
        console.debug('[signal] getUserMedia error', ...args)
      })
  }
}

const signal = new Signal()

export { signal }
