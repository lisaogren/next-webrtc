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
        {this.renderUsername()}
        <style jsx>{`
          form {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }

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

    return (
      <span>
        {!username
          ? <input type='text' id='username' name='username' placeholder='Your username' />
          : null
        }
        {this.btn()}
        <style jsx>{`
          input {
            background: transparent;
            color: #eee;
            border-width: 0 0 1px 0;
            border-bottom: #eee dotted 1px;
            padding: .5rem;
            font-size: 1.5rem;
            outline: none;

            &:focus, &:hover {
              border-bottom: #eee solid 1px;
            }
          }
        `}</style>
      </span>
    )
  }

  btn () {
    const { username } = this.signal

    let style

    if (!username) {
      style = { display: 'none' }
    } else {
      style = {
        position: 'fixed',
        top: 0,
        left: 0
      }
    }

    return (
      <button type='submit' style={style}>
        {username ? 'Logout' : 'Login'}
        <style jsx>{`
        `}</style>
      </button>
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
