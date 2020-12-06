import React, { Component } from 'react';
import All from '../All/All';
import './Journal.css';
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

class Journal extends Component {

    constructor() {
        super();
        this.state = {
            date : "",
            artist: "",
            song: "",
            entry: "",
            vibes : [],
            journal: undefined
        }
        this._clicked = this._clicked.bind(this);
    }

    componentDidMount(){
        const single_entry = this.props.match.params.single_entry;
        console.log(single_entry)
        fetch(`http://localhost:5000/search-journal-entries/${single_entry}`)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            this.setState({
                journal: result
            })

        })
    }

    _clicked() {
        const useremail = this.props.match.params.useremail;
        window.location.href = `/journal-entries/${useremail}`;
    }

    render(){
        let entry, date, artist, song= ''
        let vibe = []
        if(this.state.journal !== undefined) {
            entry = this.state.journal[0].entry
            date = this.state.journal[0].date
            artist = this.state.journal[0].artist
            song = this.state.journal[0].song
            for(let i=0; i<(this.state.journal[0].vibe).length; i++){
                vibe.push(emotions[(this.state.journal[0].vibe)[i]])
            } 


        }
        else {
            console.log("not here")
        }
        return(
            <div className = "selected-journal">
                <div className= "go-back-from-one-journal">
                <button className = "backbutton" onClick = {this._clicked}> Back </button>
                </div> 
                <div className = "journal-entry">
                <p> Vibes: {vibe} </p> 
                <p> Entry: {entry}</p>
                <p> Artist: {artist}</p>
                <p> Song: {song}</p>
                <p id= "dateprop"> 🗓 Date: {date}</p>
                </div>

            </div>
        )
    }


}

export default withRouter(Journal);