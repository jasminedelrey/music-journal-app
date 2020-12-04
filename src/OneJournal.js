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
        console.log(event.target.id)
        this.setState ({
            selection: event.target.id
        })
        console.log("hi im clicked!!");
        console.log(this.state.selection);
        //window.location.href = `/journal-entries/${this.state.selection}`;
    }

    render(){
        return(
            <div className = "journal-entry">
                <p> {this.props.date} </p>
                <p> {this.props.vibe} </p>
                <p> {this.props.artist} </p>
                <p> {this.props.song} </p>
                <p> {this.props.entry} </p>
                <button onClick = {this._clicked} id = {this.props.id}> See More </button>
            
            </div>
        )
    }


}

export default OneJournal;