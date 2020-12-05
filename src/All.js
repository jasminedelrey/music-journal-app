import React, { Component } from 'react';
import './All.css';
import {withRouter} from "react-router";
import Journal from './Journal'
import OneJournal from './OneJournal'
import { v4 as uuidv4 } from 'uuid';

class All extends Component {

    constructor() {
        super();
        this.state = {
            journals: undefined,
            userInfo: '',
            journal_length : 0
        }
        this._clicked = this._clicked.bind(this);
        this.inputRef = React.createRef();
        this.clickedVibes = this.clickedVibes.bind(this);
    }

    componentDidMount(){
        const {useremail} = this.props.match.params;
        // console.log(useremail)

        this.setState({
            userInfo:useremail
        })
        console.log("state of userinfo" + useremail)

        fetch(`http://localhost:5000/journal-entries/${useremail}`)
        .then(response => response.json())
        .then(result => {
            let length = result.length
            this.setState({
                journals: result,
                journal_length : length
            })
            console.log(result)

        })
    }

    _clicked() {
        window.location.href=`/journal-entries/:journal-entry`;
    }

    clickedVibes() {
        window.location.href = `/journal-entries/vibes/${this.state.userInfo}`;
    }

    goBack() {
        window.location.href = `/`;
    }


    render(){
        let journalComponent = "";
        if (this.state.journals !== undefined) {
            journalComponent = (this.state.journals).map(journal => {
                return <OneJournal  key = {journal._id}
                                    email = {this.state.userInfo}
                                    userid = {journal._id}
                                    date = {journal.date}
                                    vibe = {journal.vibe}
                                    artist = {journal.artist}
                                    song = {journal.song}
                                    entry = {journal.entry}
                                    />
        })
    }

        return(
            <div className= "all-entries">
            <h1 id="title"> Journal Entries</h1>
            <div id="all-buttons">
                <button id="vibe-button" onClick = {this.clickedVibes}> Vibes </button>
                <button id="entry-button" onClick = {this.goBack}> Add entry ✏️</button>
                </div>
            <div id="journal-component">
            
                <p> {journalComponent}</p>
                </div>
               <p id="no-journal"> {this.state.journal_length === 0 ? "It looks like you have no journal entries. Go ahead and add an entry!" : ""} </p>
            </div>
            )
        }
    }


export default withRouter (All);