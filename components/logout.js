import { Component } from 'react'
import { inject, observer } from 'mobx-react'

import Icon from 'components/icon'

@inject('signal')
@observer
class Logout extends Component {
  render () {
    return (
      <a href='#' onClick={this.logout} title='Logout'>
        <Icon name='close' fontSize='2rem' />
        <style jsx>{`
          a {
            position: fixed;
            top: 0;
            right: 0;
            padding: 0 .2rem;
          }
        `}</style>
      </a>
    )
  }

  logout = e => {
    e.preventDefault()

    this.props.signal.logout()
  }
}

export { Logout }
export default Logout
