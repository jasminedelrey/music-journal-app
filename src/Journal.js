import React, { Component } from 'react';
import All from './All';
import './Journal.css';
import {withRouter} from "react-router";
import OneJournal from './OneJournal'

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
    }

    componentDidMount(){
        let single_entry = this.props.match.params;
        // let villagerName= this.props.match.params;
        //console.log(villagerName);
        fetch(`http://localhost:5000/search-journal-entries/${single_entry}`)
        .then(response => response.json())
        .then(result => {
            this.setState({
                journal: result
            })

        })
    }


    render(){
        let journalComponent = "";
        if (this.state.journals !== undefined) {
            journalComponent = (this.state.journal).map(journal => {
                return <OneJournal  key = {journal._id}
                                    date = {journal.date}
                                    vibe = {journal.vibe}
                                    artist = {journal.artist}
                                    song = {journal.song}
                                    entry = {journal.entry}
                                    id = {journal._id}
                                    />
        })
    }
        return(
            <div className = "journal-entry">
                
                <p>{journalComponent}</p>

            </div>
        )
    }


}

export default withRouter(Journal);