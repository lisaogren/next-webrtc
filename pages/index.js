import { Component } from 'react'
import { Provider, observer } from 'mobx-react'

import { signal } from 'stores/signal'

import { Login } from 'components/login'
import { Status } from 'components/status'
import { Video } from 'components/video'

@observer
class HomePage extends Component {
  constructor (props) {
    super(props)
    this.myVideo = null
  }

  componentDidMount () {
    signal.init()

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => signal.createPeer({ initiator: true, stream }))
      .catch((...args) => console.debug(...args))
  }

  render () {
    const mySrc = signal.src('mine')
    if (mySrc) {
      this.myVideo = <Video src={mySrc} />
    }

    return (
      <Provider signal={signal}>
        <div>
          <h1>Simple Hangout!</h1>
          <Status />
          <Login />
          {this.myVideo}
        </div>
      </Provider>
    )
  }
}

export default HomePage
