import { Component } from 'react'
import { observer, inject } from 'mobx-react'
import classNames from 'classnames'

@inject('signal') @observer
class Status extends Component {
  render () {
    const { connected } = this.props.signal

    const status = connected ? 'Connected' : 'Disconnected'
    const lightClasses = classNames('light', {
      'is-green': connected,
      'is-red': !connected
    })

    return (
      <div className='status' title={`Current connection status: ${status}`}>
        <div className={lightClasses} />
        <style jsx>{`
          .status {
            position: fixed;
            bottom: 0;
            right: 0;
            padding: .5rem;
            z-index: 20;
          }

          .light {
            width: 15px;
            height: 15px;
            border-radius: 7.5px;
            border: #222 solid 1px;

            &.is-green {
              background: green;
            }
            &.is-red {
              background: red;
            }
          }
        `}</style>
      </div>
    )
  }
}

export { Status }
