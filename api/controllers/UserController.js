/* globals sails */

module.exports = {
  login (req, res) {
    if (!req.isSocket) return res.badRequest()

    const username = req.param('username')

    console.log('[UserController] Login using', username)

    sails.sockets.join(req, 'rtc', err => {
      if (err) return res.serverError(err)

      sails.sockets.broadcast('rtc', 'join', { username })

      return res.json({ username })
    })
  }
}
