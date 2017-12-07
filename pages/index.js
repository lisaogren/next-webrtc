import { Component } from 'react'
import { Provider, observer } from 'mobx-react'

import { signal } from 'stores/signal'

import { Login } from 'components/login'
import { Status } from 'components/status'
import { Video } from 'components/video'

@observer
class HomePage extends Component {
  myVideo = null
  theirVideo = null

  constructor (props) {
    super(props)
    this.myVideo = null
  }

  componentDidMount () {
    signal.init()
  }

  render () {
    const mySrc = signal.src('mine')
    const theirSrc = signal.src('theirs')

    if (mySrc) {
      this.myVideo = <Video src={mySrc} />
    }
    if (theirSrc) {
      this.theirVideo = <Video src={theirSrc} />
    }

    return (
      <Provider signal={signal}>
        <div>
          <h1>Simple Hangout!</h1>
          <Status />
          <Login />
          {this.myVideo}
          {this.theirVideo}
        </div>
      </Provider>
    )
  }
}

export default HomePage
