import React, { Component } from 'react';
import './Login.css';
import {withRouter} from "react-router";
import GoogleBtn from './GoogleBtn'

class Login extends Component {

    constructor() {
        super();
        this.state= { 
            loggedIn : false,
            userInfo : ""
        }
        this.userLoggedIn = this.userLoggedIn.bind(this);
        this._clickedNewEntry = this._clickedNewEntry.bind(this);
        this.clickedJournals = this.clickedJournals.bind(this);
    }

    userLoggedIn(email) {
        console.log("email is" + email);
        let userEmail = email;

        if (email) {
            this.setState({
                loggedIn : true,
                userInfo : userEmail
            })
        }

        else {
            this.setState({
                loggedIn : false
            })
        }

        console.log("the logged in state is: " + this.state.loggedIn)
        console.log("the email state is: " + this.state.userEmail)
    }

    _clickedNewEntry() {
        if (this.state.userInfo === undefined){
            console.log("Not reached.")
        }

        else{
            window.location.href = `/home/${this.state.userInfo}`;
        }
    }

   clickedJournals(){
    if(this.state.userInfo === undefined){
        console.log("Not reached.")
    }
    else{
        window.location.href=`/journal-entries/${this.state.userInfo}`;
    }
    }

    render(){
        return(
            <div className = "login">
                <h1> WELCOME TO VIBECHECK // A JASMINE REYES AND ALI MIAN PRODUCTION</h1>


                {this.state.loggedIn ? <div className="login-buttons"> <button onClick = {this.clickedJournals}> Go to your journals </button> <br/>
                <button onClick = {this._clickedNewEntry}> Add a new entry </button>  </div>
                
                : <p> Please Log in</p>}

                <GoogleBtn
                    userLogin = {this.userLoggedIn}
                />
            
            </div>
        )
    }


}

export default withRouter(Login);