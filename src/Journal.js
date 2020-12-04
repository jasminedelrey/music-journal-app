import React, { Component } from 'react';
import All from './All';
import './Journal.css';
import {withRouter} from "react-router";


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
        let entry, date, artist, song = ''
        if(this.state.journal !== undefined) {
            entry = this.state.journal[0].entry
            date = this.state.journal[0].date
            artist = this.state.journal[0].artist
            song = this.state.journal[0].song

        }
        else {
            console.log("not here")
        }
        return(
            <div className = "journal-entry">

                <button onClick = {this._clicked}> Back </button>

                <p> {entry}</p>
                <p> {date}</p>
                <p> {artist}</p>
                <p> {song}</p>

            </div>
        )
    }


}

export default withRouter(Journal);