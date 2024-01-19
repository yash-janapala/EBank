import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {userId: '', userPin: '', errorMsg: '', showSubmitError: false}

  onChangeUserId = event => this.setState({userId: event.target.value})

  onChangeUserPin = event => {
    this.setState({userPin: event.target.value})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userId, userPin} = this.state
    const userDetails = {user_id: userId, pin: userPin}
    const loginUrl = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()

    if (response.ok) {
      const {history} = this.props
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      history.replace('/')
    } else {
      this.setState({errorMsg: data.error_msg, showSubmitError: true})
    }
  }

  render() {
    const {errorMsg, showSubmitError} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="main-container">
        <div className="card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="website-login"
          />
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <h1 className="form-heading">Welcome Back!</h1>
            <div className="input-container">
              <label className="label-input" htmlFor="userId">
                User ID
              </label>
              <input
                type="text"
                className="input-field"
                id="userId"
                placeholder="Enter User ID"
                onChange={this.onChangeUserId}
              />
            </div>
            <div className="input-container">
              <label className="label-input" htmlFor="userPin">
                PIN
              </label>
              <input
                type="password"
                className="input-field"
                id="userPin"
                placeholder="Enter PIN"
                onChange={this.onChangeUserPin}
              />
            </div>
            <button className="login-button" type="submit">
              Login
            </button>
            {showSubmitError && <p className="error-msg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
