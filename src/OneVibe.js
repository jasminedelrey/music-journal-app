import React, { Component } from 'react';
import All from './All';
import './Journal.css';
import {withRouter} from "react-router";

class OneVibe extends Component {

    constructor() {
        super();
        this.state = {
            entry : undefined,
            matches : undefined,
            songs : [],
            vibe : "Choose a vibe playlist"
        }
    }



    render(){

        return(
            <div className = "listed-vibes">
            <p> HI </p>
                <p> This is your match: {this.props.match}</p>
            
            </div>
        )
    }


}

export default OneVibe;