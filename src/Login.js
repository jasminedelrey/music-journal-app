import React, { Component } from 'react';
import './Login.css';
import {withRouter} from "react-router";
import GoogleBtn from './GoogleBtn'

class Login extends Component {

    constructor() {
        super();
        this.state= { 
            loggedIn : false
        }
        this.userLoggedIn = this.userLoggedIn.bind(this);
    }

    _clickedNewEntry() {
        window.location.href = `http://localhost:3000/home`;
    }

   clickedJournals(){
        window.location.href=`http://localhost:3000/journal-entries`;
    }

    userLoggedIn(boolean) {
        console.log("boolean is" + boolean);

        if (boolean === true) {
            this.setState({
                loggedIn : true
            })
        }

        else {
            this.setState({
                loggedIn : false
            })
        }

        console.log("the logged in state is: " + this.state.loggedIn)
    }

    render(){
        return(
            <div className = "login">
                <h1> WELCOME TO VIBECHECK // A JASMINE REYES AND ALI MIAN PRODUCTION</h1>


                {this.state.loggedIn ? <div className="login-buttons"> <button onClick = {this.clickedJournals}> Go to your journals </button> <br/>
                <button onClick = {this._clickedNewEntry}> Add a new entry </button>  </div>: <p> Please Log in</p>}

                <GoogleBtn
                    userLogin = {this.userLoggedIn}
                />
            
            </div>
        )
    }


}

export default withRouter(Login);