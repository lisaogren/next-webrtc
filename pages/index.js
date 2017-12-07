import { Component } from 'react'
import { Provider, observer } from 'mobx-react'

import { signal } from 'stores/signal'

import { Login } from 'components/login'
import { Status } from 'components/status'
import { Video } from 'components/video'

@observer
class HomePage extends Component {
  componentDidMount () {
    signal.init()

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => signal.createPeer({ initiator: true, stream }))
      .catch((...args) => console.debug(...args))
  }

  render () {
    const { users } = signal

    return (
      <Provider signal={signal}>
        <div>
          <h1>Simple Hangout!</h1>
          <Status />
          <Login />
          <div>
            <h3>Users</h3>
            <ul>
              {users.map(({ username }) => <li key={username}>{username}</li>)}
            </ul>
          </div>
          <Video src={signal.src} />
        </div>
      </Provider>
    )
  }
}

export default HomePage
