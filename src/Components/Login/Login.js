import React, { Component } from 'react';
import './Login.css';
import {withRouter} from "react-router";
import GoogleBtn from '../GoogleBtn/GoogleBtn'

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
        this.handleLogOut = this.handleLogOut.bind(this);
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

    handleLogOut(boolean) {
        this.setState({
            loggedIn : boolean
        })
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
                <h1 id= "intro1"> VibeCheck</h1>
                <h2 id= "intro2">  A music journal for your vibes.</h2>


                {this.state.loggedIn ? <div className="login-buttons"> <button className = "journal-button" onClick = {this.clickedJournals}> Go to your journals 📔 </button> <br/>
                <button className = "entry-button" onClick = {this._clickedNewEntry}> Add a new entry ✏️ </button>  </div>
                
                : <p className= "pre-login"> Please Log in to start</p>}

                <GoogleBtn
                    userLogin = {this.userLoggedIn}
                    handlelogout = {this.handleLogOut}
                />
            
            </div>
        )
    }


}

export default withRouter(Login);