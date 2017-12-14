import { observable, action, computed } from 'mobx'

import SimplePeer from 'simple-peer'

import api from 'utils/api'

class Signal {
  io = null
  p2p = null

  @observable streams = {
    mine: null,
    theirs: null
  }

  @observable username = null
  @observable ready = false
  @observable connected = false
  @observable peer = null

  @computed get src () {
    return (type) => {
      if (!this.streams[type]) return null

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
    api.io.socket.on('peer', ({ peer }) => this.foundPeer({ peer, initiator: true }))
  }

  // Actions

  @action connect = () => { this.connected = true }
  @action disconnect = () => { this.connected = false }

  @action login = async ({ username }) => {
    console.debug('[signal] Login using', username)

    const data = { username }

    const response = await api.socket.login({ data })

    this.username = response.username

    await this.getUserMedia()

    this.setReady()
  }

  @action logout = async () => {
    console.debug('[signal] Logout')

    await api.socket.logout()

    if (this.p2p) {
      this.p2p.destroy()
      this.p2p = null
    }

    this.username = null

    if (this.streams.mine) this.stop(this.streams.mine)
    if (this.streams.theirs) this.stop(this.streams.theirs)

    this.streams.mine = null
    this.streams.theirs = null
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

  @action setReady = async () => {
    console.debug('[signal] Setting user ready')

    this.ready = true

    const { peer } = await api.socket.ready()

    if (peer) {
      this.foundPeer({ peer })
    }
  }

  @action foundPeer = ({ peer, initiator = false }) => {
    console.debug('[signal] Found peer:', peer, ', initiator:', initiator)

    this.peer = peer

    if (initiator) {
      this.createPeer({ initiator: true })
    }
  }

  // Helpers

  signal = (data) => {
    console.debug('[signal] Got `signal` event', data)

    if (!this.p2p) {
      this.createPeer({ initiator: false })
    }

    this.p2p.signal(data)
  }

  createPeer = ({ initiator }) => {
    this.p2p = new SimplePeer({ initiator, stream: this.streams.mine })

    this.p2p.on('signal', data => signal.send(data))
    this.p2p.on('stream', stream => {
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

  stop = (stream) => {
    if (!stream) return

    stream.getTracks().forEach(track => track.stop())
  }
}

const signal = new Signal()

export { signal }
