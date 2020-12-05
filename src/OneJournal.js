import React, { Component } from 'react';
import All from './All';
import './OneJournal.css';
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
                <p> Vibes: {this.props.vibe} </p>
                <p> Artist: {this.props.artist} </p>
                <p> Song: {this.props.song} </p>
                <p> Entry: {this.props.entry} </p>
                <p id= "dateprop"> 📅 Date: {this.props.date} </p>
                <button className="see-more" onClick = {this._clicked} id = {this.props.userid}> See More </button>
            
            </div>
        )
    }


}

export default OneJournal;