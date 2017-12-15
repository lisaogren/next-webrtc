import { Component } from 'react'
import { observer, inject } from 'mobx-react'
import classNames from 'classnames'

@inject('signal') @observer
class Status extends Component {
  constructor (props) {
    super(props)
    this.signal = props.signal
  }

  render () {
    const { connected } = this.signal

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
            left: 0;
            padding: .5rem;
          }

          .light {
            width: 15px;
            height: 15px;
            border-radius: 7.5px;

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
