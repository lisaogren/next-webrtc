/* globals sails */

const { remove, find } = require('lodash')

const users = []

module.exports = {
  list (req, res) {
    return res.json(
      users.map(({ username }) => ({ username }))
    )
  },

  login (req, res) {
    if (!req.isSocket) return res.badRequest()

    const username = req.param('username')
    const id = sails.sockets.getId(req)

    console.log('[UserController] Login using', username)

    const user = find(users, { id })

    if (user) {
      user.username = username
    } else {
      users.push({ id, username })
    }

    sails.sockets.join(req, 'rtc', err => {
      if (err) return res.serverError(err)

      sails.sockets.broadcast('rtc', 'join', { username }, req)

      return res.json({ username })
    })
  },

  logout (req, res) {
    if (!req.isSocket) return res.badRequest()

    const id = sails.sockets.getId(req)

    sails.sockets.leave(req, 'rtc', err => {
      if (err) return res.serverError(err)

      const user = find(users, { id })

      if (user) {
        sails.sockets.broadcast('rtc', 'leave', user, req)

        remove(users, { id })
      }

      return res.ok()
    })
  },

  signal (req, res) {
    if (!req.isSocket) return res.badRequest()

    const data = req.param('data')

    sails.sockets.broadcast('rtc', 'signal', data, req)

    return res.ok()
  }
}
