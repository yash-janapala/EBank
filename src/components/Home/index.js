import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
import './index.css'

const Home = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  return (
    <div className="home-bg-container">
      <div className="header-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
        />
        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </div>

      <div className="home-details-container">
        <h1 className="home-details-heading">
          Your Flexibility, Our Excellence
        </h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
          className="digital-card-image"
        />
      </div>
    </div>
  )
}

export default withRouter(Home)
