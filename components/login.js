import { Component } from 'react'
import { observer, inject } from 'mobx-react'

import Icon from 'components/icon'

import { serialize } from 'utils/form-serialize'

@inject('signal') @observer
class Login extends Component {
  state = {
    error: null
  }

  render () {
    const { error } = this.state

    return (
      <div className='login-container'>
        <header>
          <h1>WebRTC Roulette</h1>
        </header>

        <form onSubmit={this.submit}>
          <div>
            <input type='text' name='username' placeholder='Choose a nickname' onChange={this.resetError} />
            <button type='submit' title='Login'>
              <Icon name='arrow-right' fontSize='1.5rem' />
            </button>
          </div>
          {error ? <div className='error-msg'>{error}</div> : null}
        </form>

        <style jsx>{`
          .login-container {
            width: 100%;
            height: 100%;
          }

          header {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            padding-top: 1rem;
            text-align: center;
          }

          form {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          }

          label {
            margin-right: .5rem;
            font-weight: bold;
          }

          button {
            background: transparent;
            border: 0;
            cursor: pointer;
          }

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

          .error-msg {
            margin-top: .5rem;
            color: #cf5959;
            font-style: italic;
          }
        `}</style>
      </div>
    )
  }

  resetError = () => {
    this.setState({ error: null })
  }

  submit = e => {
    e.preventDefault()

    const { signal } = this.props
    const { username } = serialize(e.currentTarget)

    if (!username) return this.setState({ error: `You can't leave the username empty` })

    signal.login({ username })
  }
}

export { Login }
