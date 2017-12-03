import { Component } from 'react'
import { observer, inject } from 'mobx-react'

@inject('signal') @observer
class Status extends Component {
  constructor (props) {
    super(props)
    this.signal = props.signal
  }

  render () {
    const { connected } = this.signal

    const content = connected ? 'Connected' : 'Disconnected'

    return (
      <div className='status'>
        {content}
        <style jsx>{`
          .status {
            position: fixed;
            top: 0;
            right: 0;
            padding: .5rem;
          }
        `}</style>
      </div>
    )
  }
}

export { Status }
