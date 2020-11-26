import React, { Component } from 'react';
import All from './All';
import './Journal.css';
import {withRouter} from "react-router";

class OneJournal extends Component {

    _clicked() {

    }

    render(){
        return(
            <div className = "journal-entry">
                <p> {this.props.date} </p>
                <p> {this.props.vibe} </p>
                <p> {this.props.artist} </p>
                <p> {this.props.song} </p>
                <p> {this.props.entry} </p>
                <button onClick = {this._clicked()}> See More </button>
            
            </div>
        )
    }


}

export default OneJournal;