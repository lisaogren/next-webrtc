import { Component } from 'react'
import { Provider } from 'mobx-react'

import { signal } from 'stores/signal'

import { Login } from 'components/login'
import { Status } from 'components/status'

class HomePage extends Component {
  componentDidMount () {
    signal.init()
  }

  render () {
    return (
      <Provider signal={signal}>
        <div>
          <h1>Simple Hangout!</h1>
          <Status />
          <Login />
        </div>
      </Provider>
    )
  }
}

export default HomePage
