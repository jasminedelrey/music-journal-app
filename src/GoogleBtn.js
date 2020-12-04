import React, { Component } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import axios from 'axios';


const CLIENT_ID = '734371553562-rauojrm46mbmdggirl1d0e4cqtst4fdj.apps.googleusercontent.com';


class GoogleBtn extends Component {
   constructor(props) {
    super(props);

    this.state = {
      isLogined: false,
      accessToken: '',
      userinfo : ''
    };

    this.login = this.login.bind(this);
    this.handleLoginFailure = this.handleLoginFailure.bind(this);
    this.logout = this.logout.bind(this);
    this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
  }

  handleEmail(email){
    // const new_user= { 
    //                   userEmail: email
    //                 };
    //     axios.post('http://localhost:5000/addNewUser', new_user)
    //         .then(response => this.setState({ userinfo: email}));
    
      this.setState({
      userinfo : email
    })

    this.props.userLogin(email);
    console.log("in handleEmail function" + this.state.userinfo)
  }

  login(response) {
  
    console.log("HELLO")
    let email = ''

    if (response.accessToken){

      fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${response.accessToken}`)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        email = result.email
        this.handleEmail(email)

      })
      console.log(email)

      this.setState(state => ({
        isLogined: true,
        accessToken: response.accessToken,
      })
      );
    }      
    console.log("ACCESS TOKEN IN LOGIN" + this.state.accessToken);
  }

  logout (response) {
    this.setState(state => ({
      isLogined: false,
      accessToken: ''
    }));

    console.log("ACCESS TOKEN IN LOGOUT" + this.state.accessToken);
  }

  handleLoginFailure (response) {
    alert('Failed to log in')
  }

  handleLogoutFailure (response) {
    alert('Failed to log out')
  }

  render() {
    return (
    <div>
      { this.state.isLogined ?
        <GoogleLogout
          clientId={CLIENT_ID}
          buttonText='Logout'
          onLogoutSuccess={ this.logout }
          onFailure={ this.handleLogoutFailure }
        >
        </GoogleLogout>: <GoogleLogin
          clientId={CLIENT_ID}
          buttonText='Login'
          onSuccess={ this.login }
          onFailure={ this.handleLoginFailure }
          cookiePolicy={ 'single_host_origin' }
          responseType='code,token'
        />
      }
      {/* { this.state.accessToken ? <h5>Your Access Token: <br/><br/> { this.state.accessToken }</h5> : null } */}

    </div>
    )
  }
}

export default GoogleBtn;