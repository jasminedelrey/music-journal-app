import React, { Component } from 'react';
import './Home.css';
import {withRouter} from "react-router";
import GoogleBtn from './GoogleBtn'
import axios from 'axios';


class Home extends Component {
    constructor(){
        super();
        this.songRef = React.createRef();
        this.artistRef = React.createRef();
        this.vibeRef = React.createRef();
        this.monthRef = React.createRef();
        this.dayRef = React.createRef();
        this.yearRef = React.createRef();
        this.idRef = React.createRef();
        this.entryRef = React.createRef();

        this.state = {
            journalId : ""
        }
    }
    _clicked(){
        //console.log(this.inputRef.current.value);
        console.log(this.artistRef.current.value);
        console.log(this.songRef.current.value);
        const new_journal_entry = { _id: 'React POST Request Example 2', 
                                    date: "today",
                                    vibe: "happy",
                                    artist: this.artistRef.current.value,
                                    song: this.songRef.current.value,
                                    entry: this.entryRef.current.value
                                    };
        axios.post('http://localhost:5000/addNewJournal', new_journal_entry)
            .then(response => this.setState({ journalId: response.data._id }));
    
        window.location.href=`/journal-entries`;
    }

    render() {
        return(
            <div className = "Home">
                <h1> Welcome to the home page.</h1>

                <div className = "search-container">
                    Song: <input type="text" ref={this.songRef}/>
                    Artist: <input type="text" ref={this.artistRef}/>
                    Entry: <textarea rows="4" cols="50" name="comment" form="usrform" ref={this.entryRef}/>

                    <select name= "day" ref={this.dayRef}>
                        <option value="01">01</option>
                        <option value="01">03</option>
                        <option value="01">04</option>
                    </select>
                    <select name= "month" ref={this.monthRef}>
                        <option value="09">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                    </select>
                    <select name= "year" ref={this.yearRef}>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                    </select>
                    <div className = "vibes">
                        <span className= "vibe" alt="happy">😁</span>
                        <span className= "vibe" alt="sheep-emoji">🙂</span>
                        <span className= "vibe" alt="sheep-emoji">😐</span>
                        <span className= "vibe" alt="sheep-emoji">🙁</span>
                        <span className= "vibe" alt="sheep-emoji">😎</span>
                        <span className= "vibe" alt="sheep-emoji">🙃</span>
                        <span className= "vibe" alt="sheep-emoji">🤩</span>
                        <span className= "vibe" alt="sheep-emoji">😏</span>
                        <span className= "vibe" alt="sheep-emoji">😪</span>
                        <span className= "vibe" alt= "worried"> 😟 </span>
                        <span className= "vibe" alt= "worried"> 😭 </span>
                        <span className= "vibe" alt= "worried"> 😞 </span>
                        <span className= "vibe" alt= "worried"> 🥺 </span>
                    </div>

                </div>

                <GoogleBtn/>

                <button className = "go" onClick = {() => this._clicked()}>
                    Submit
                </button>

            </div>
        );
    }
}

export default withRouter(Home);