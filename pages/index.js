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

  componentDidMount () {
    signal.init()
  }

  render () {
    const mySrc = signal.src('mine')
    const theirSrc = signal.src('theirs')

    if (mySrc) {
      this.myVideo = <Video src={mySrc} muted mine />
    }
    if (theirSrc) {
      this.theirVideo = <Video src={theirSrc} />
    }

    return (
      <Provider signal={signal}>
        <div className='main-container'>
          <h1>Simple Hangout!</h1>
          <Status />
          <Login />
          {this.myVideo}
          {this.theirVideo}

          <style jsx global>{`
            html, body {
              margin: 0;
              padding: 0;
              background: black;
              color: white;
            }

            .main-container {
              padding: 1px;
            }
          `}</style>
        </div>
      </Provider>
    )
  }
}

export default HomePage
