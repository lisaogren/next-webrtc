import { Component } from 'react'
import { Provider, observer } from 'mobx-react'

import { signal } from 'stores/signal'

import { Login } from 'components/login'
import { Logout } from 'components/logout'
import { Status } from 'components/status'
import { Video } from 'components/video'

@observer
class HomePage extends Component {
  componentDidMount () {
    signal.init()
  }

  render () {
    const mySrc = signal.src('mine')
    const theirSrc = signal.src('theirs')

    let myVideo, theirVideo
    if (mySrc) myVideo = <Video src={mySrc} muted mine />
    if (theirSrc) theirVideo = <Video src={theirSrc} />

    return (
      <Provider signal={signal}>
        <div className='main-container'>
          {signal.isLoggedIn ? <Logout /> : <Login />}

          <div className='video-container'>
            {myVideo}
            {theirVideo}
          </div>

          <Status />

          <style jsx global>{`
            html, body {
              margin: 0;
              padding: 0;
              background: #222;
              color: #eee;
              font-family: sans-serif;
            }

            html {
              width: 100vw;
              height: 100vh;
            }

            body, body > div:first-child, #__next, .main-container, [data-reactroot] {
              width: 100%;
              height: 100%;
            }

            .video-container {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
              height: 100%;
            }
          `}</style>
        </div>
      </Provider>
    )
  }
}

export default HomePage
