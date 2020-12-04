import React, { Component } from 'react';
import All from './All';
import './Journal.css';
import {withRouter} from "react-router";

class OneJournal extends Component {

    constructor(){
        super();
        this.state= {
            selection: ""
        }

        this._clicked = this._clicked.bind(this);
    }

    _clicked(event) {
        window.location.href = `/selectedjournal/${this.props.email}/${event.target.id}`;
    }

    render(){
        return(
            <div className = "journal-entry">
                <p>{this.props.userid}</p>
                <p> {this.props.date} </p>
                <p> {this.props.vibe} </p>
                <p> {this.props.artist} </p>
                <p> {this.props.song} </p>
                <p> {this.props.entry} </p>
                <button onClick = {this._clicked} id = {this.props.userid}> See More </button>
            
            </div>
        )
    }


}

export default OneJournal;