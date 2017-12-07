import { Component } from 'react'
import { observer, inject } from 'mobx-react'

import { serialize } from 'utils/form-serialize'

@inject('signal') @observer
class Login extends Component {
  constructor (props) {
    super(props)
    this.signal = props.signal
  }

  render () {
    return (
      <form onSubmit={this.submit}>
        <label htmlFor='username'>Username:</label>
        {this.renderUsername()}
        <style jsx>{`
          label {
            margin-right: .5rem;
            font-weight: bold;
          }

          input {
            margin-right: .5rem;
          }
        `}</style>
      </form>
    )
  }

  renderUsername () {
    const { username } = this.signal

    if (username) {
      return (
        <span>
          <span>{username}</span>
          <button type='submit'>Logout</button>
          <style jsx>{`
            button {
              margin-left: .5rem;
            }
          `}</style>
        </span>
      )
    }

    return (
      <span>
        <input type='text' id='username' name='username' />
        <button type='submit'>Login</button>
        <style jsx>{`
          button {
            margin-left: .5rem;
          }
        `}</style>
      </span>
    )
  }

  submit = e => {
    e.preventDefault()

    if (this.signal.username) {
      this.signal.logout()
    } else {
      const { username } = serialize(e.currentTarget)

      this.signal.login({ username })
    }
  }
}

export { Login }
