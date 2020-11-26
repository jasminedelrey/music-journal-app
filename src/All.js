import React, { Component } from 'react';
import './All.css';
import {withRouter} from "react-router";
import Journal from './Journal'
import OneJournal from './OneJournal'

class All extends Component {

    constructor() {
        super();
        this.state = {
            journals: undefined 
        }
        this._clicked = this._clicked.bind(this);
        this.inputRef = React.createRef();
    }

    componentDidMount(){
        // let villagerName= this.props.match.params;
        fetch(`http://localhost:5000/journal-entries`)
        .then(response => response.json())
        .then(result => {
            this.setState({
                journals: result
            })
            console.log(result)

        })
    }

    _clicked() {
        window.location.href=`/journal-entries/:journal-entry`;
    }

    render(){
        let journalComponent = "";
        if (this.state.journals !== undefined) {
            journalComponent = (this.state.journals).map(journal => {
                return <OneJournal  key = {journal.date}
                                    date = {journal.date}
                                    vibe = {journal.vibe}
                                    artist = {journal.artist}
                                    song = {journal.song}
                                    entry = {journal.entry}
                                    />
        })
    }

        return(
            <div>
            <h1> Journal Entries</h1>
                <p> {journalComponent}</p>
                <button> Vibes </button>
                <p> present vibes </p>
            </div>
            )
        }
    }


export default withRouter (All);