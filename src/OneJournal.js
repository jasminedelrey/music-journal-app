import React, { Component } from 'react';
import All from './All';
import './Journal.css';
import {withRouter} from "react-router";

class OneJournal extends Component {

    render(){
        return(
            <div className = "journal-entry">
                <p> {this.props.key} </p>
                <p> {this.props.entry} </p>
                <button> See More </button>
            
            </div>
        )
    }


}

export default OneJournal;