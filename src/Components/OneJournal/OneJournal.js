import React, { Component } from 'react';
import All from '../All/All';
import './OneJournal.css';
import {withRouter} from "react-router";

const emotions = {
    "happy" : "😁",
    "okay" : "🙂",
    "neutral" : "😐",
    "sad" : "🙁",
    "cool" : "😎",
    "awkward" : "🙃",
    "ecstatic" : "🤩",
    "smirky" : "😏",
    "unfortunate" : "😪",
    "worried" : "😟",
    "overwhelmed" : "😭",
    "defeated" : "😞",
    "please" : "🥺"
}

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
        let entry_text = "";
        let entryVibe = [];
        for(let i=0; i<(this.props.vibe).length; i++){
            entryVibe.push(emotions[(this.props.vibe)[i]])
        } 
        
        if (this.props.entry.length > 30){
        entry_text = (this.props.entry).substring(0,31) + "..." + (this.props.entry).substring(this.props.entry.length)}

        else{
        entry_text = this.props.entry
        }
        return(
            <div className = "journal-entry">
                <p> Vibes: {entryVibe} </p>
                <p> Artist: {this.props.artist} </p>
                <p> Song: {this.props.song} </p>
                <p id= "journal-entry-div"> Entry: {entry_text} </p>
                <p id= "dateprop"> 🗓 Date: {this.props.date} </p>
                <button className="see-more" onClick = {this._clicked} id = {this.props.userid}> See More </button>
            
            </div>
        )
    }


}

export default OneJournal;