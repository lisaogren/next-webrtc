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
    const { username } = this.signal

    return (
      <form onSubmit={this.submit}>
        <label htmlFor='username'>Username:</label>
        {
          username
            ? <span>{username}</span>
            : <span><input type='text' id='username' name='username' /><button type='submit'>Login</button></span>
        }
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

  submit = e => {
    e.preventDefault()

    const { username } = serialize(e.currentTarget)

    this.signal.login({ username })
  }
}

export { Login }
