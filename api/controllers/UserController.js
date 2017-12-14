/* globals sails */

const { remove, find, get } = require('lodash')

const users = []

module.exports = {
  login (req, res) {
    if (!req.isSocket) return res.badRequest()

    const username = req.param('username')
    const id = sails.sockets.getId(req)

    console.log('[UserController] Login:', username)

    const user = find(users, { id })

    if (user) {
      user.username = username
    } else {
      users.push({ id, username, ready: false, peer: null })
    }

    return res.json({ username })
  },

  logout (req, res) {
    if (!req.isSocket) return res.badRequest()

    const id = sails.sockets.getId(req)
    const user = find(users, { id })

    console.log('[UserController] Logout:', user.username)

    if (user) {
      const peer = find(users, u => u.peer && u.peer.id === user.id)

      if (peer) delete peer.peer

      remove(users, { id })
    }

    return res.ok()
  },

  ready (req, res) {
    if (!req.isSocket) return res.badRequest()

    const id = sails.sockets.getId(req)
    const user = find(users, { id })

    if (!user) return res.badRequest()

    console.log('[UserController] Ready:', user.username)

    user.ready = true

    // Find a user that is ready, has no peer and is not me
    const peer = find(users, user => user.ready && user.id !== id && !user.peer)

    if (peer) {
      user.peer = peer
      peer.peer = user

      sails.sockets.broadcast(peer.id, 'peer', { peer: user.username })
    }

    res.json({ peer: get(peer, 'username') })
  },

  signal (req, res) {
    if (!req.isSocket) return res.badRequest()

    const data = req.param('data')

    const id = sails.sockets.getId(req)
    const user = find(users, { id })

    if (!user || !user.peer) return res.badRequest()

    console.log('[UserController] Signal from:', user.username, ', to:', user.peer.username)

    sails.sockets.broadcast(user.peer.id, 'signal', data)

    res.ok()
  }
}
