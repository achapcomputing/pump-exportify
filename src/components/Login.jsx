import React from "react"
import { Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { getQueryParam } from "helpers"

class Login extends React.Component {
  authorize() {
    // let clientId = "b8267324f80b4a9b9ba8c410e566b844"
    let clientId = getQueryParam("app_client_id")
    let changeUser = getQueryParam("change_user") !== ""

    // Use Pumpify application clientId if none given
    if (clientId === '') {
      clientId = "b8267324f80b4a9b9ba8c410e566b844"
    }

    window.location.href = "https://accounts.spotify.com/authorize" +
      "?client_id=" + clientId +
      "&redirect_uri=" + encodeURIComponent([window.location.protocol, '//', window.location.host, window.location.pathname].join('')) +
      "&scope=user-library-read%20playlist-modify-public" +
      "&response_type=token" +
      "&show_dialog=" + changeUser;
  }

  render() {
    return (
      <Button id="loginButton" type="submit" variant="outline-secondary" size="lg" onClick={this.authorize}>
        <FontAwesomeIcon icon={['far', 'check-circle']} size="sm" /> Get Started
      </Button>
    )
  }
}

export default Login
