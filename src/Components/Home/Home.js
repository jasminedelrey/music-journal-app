import React, { Component } from 'react';
import './Home.css';
import {withRouter} from "react-router";
import axios from 'axios';
import GoogleBtn from '../GoogleBtn/GoogleBtn'
import { v4 as uuidv4 } from 'uuid';

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
            journalId : "",
            day_selection : "",
            month_selection : "",
            year_selection : "",
            date_selection : "",
            emoji_vibe: [],
            _id : "",
            userInfo : "",
            entered : false
        }
        this._clicked = this._clicked.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.goBack = this.goBack.bind(this);
        }

    componentDidMount(){
        const {useremail} = this.props.match.params;
        console.log(useremail)
        this.setState({
            userInfo: useremail
        })

        console.log("user info state is: " + this.state.userInfo)
        

        let ddropdown = document.getElementById('day');
        let mdropdown = document.getElementById('month');
        mdropdown.length = 0;
        ddropdown.length = 0;

        let defaultDay = document.createElement('option');
        let defaultMonth = document.createElement('option');
        defaultDay.text = "Day";
        defaultMonth.text = "Month";
        ddropdown.add(defaultDay);
        mdropdown.add(defaultMonth);
        ddropdown.selectedIndex = 0;
        mdropdown.selectedIndex = 0;

        for(let i = 1; i < 32; i++) {
            let option = document.createElement('option')
            option.text = i
            option.value = i
            option.id = i
            ddropdown.add(option)
        }

        for(let i = 1; i < 13; i++) {
            let option = document.createElement('option')
            option.text = i
            option.value = i
            option.id = i
            mdropdown.add(option)
        }
    }

    goBack() {
        window.location.href = `/journal-entries/${this.state.userInfo}`
    }
    
    
    _clicked(){
        //console.log(this.inputRef.current.value);
        console.log(this.artistRef.current.value);
        console.log(this.songRef.current.value);
        console.log(this.state.userInfo)
        if (this.state.day_selection !== "" &&
        this.state.year_selection !== "" && 
        this.state.month_selection !== "" && 
        this.state.emoji_vibe !== "" && 
        this.artistRef.current.value !== "" && 
        this.songRef.current.value !== "" && 
        this.entryRef.current.value !== "" ) {
            this.setState({
                entered : true
            })
        const new_journal_entry = { _id: uuidv4(), 
                                    user_email: this.state.userInfo,
                                    date: this.state.month_selection + "-" + this.state.day_selection + "-" + this.state.year_selection,
                                    vibe: this.state.emoji_vibe,
                                    artist: this.artistRef.current.value,
                                    song: this.songRef.current.value,
                                    entry: this.entryRef.current.value
                                    };
        axios.post('http://localhost:5000/addNewJournal', new_journal_entry)
            .then(response => this.setState({ journalId: response.data._id }));
    
        window.location.href=`/journal-entries/${this.state.userInfo}`;
        }

        else {
            this.setState({
                entered : false
            })
        }
    
        // window.location.href=`/journal-entries`;
    }

    handleClick(event) {
        let vibe_list = this.state.emoji_vibe;
        let selected = document.getElementById(event.target.id);
        selected.classList.add("show");

        if (vibe_list.indexOf(event.target.id) === -1) {
            // console.log("in if")
            vibe_list.push(event.target.id);
            this.setState({
                emoji_vibe : vibe_list
            })
        }

        else {
            // console.log("in else")
            for(let i= 0; i < vibe_list.length; i++) {
                if(vibe_list[i] === event.target.id) {
                    vibe_list.splice(i,1);
                }
            }

            selected.classList.remove("show")

            this.setState({
                emoji_vibe : vibe_list
            })
        }
        
        console.log(this.state.emoji_vibe)

    }

    handleOnChange(event) {
        console.log("month = " + this.state.month_selection)
        console.log("year = " + this.state.year_selection)
        console.log("day = " + this.state.day_selection)
        if(event.target.id === "day") {
            this.setState({
                day_selection : event.target.value
            })
        }
        else if(event.target.id === "month") {
            this.setState({
                month_selection : event.target.value
            })

        }
        else if(event.target.id === "year") {
            this.setState({
                year_selection : event.target.value
            })

        }
        
    }



    render() {

        return(
            <div className = "Home">
                <div className = "Header">
                    <h1>Vibecheck</h1>
                </div>
                {/* <p> Changed your mind? View journals here. </p> */}
                <button className="viewJournals" onClick= {this.goBack}> View Journals </button>
                <p id="error-message"> {this.state.entered ? "" : "Please fill in all fields to form an entry"}</p>
                <div className = "search-container">
                    <div className="songinput"><input type="text" className = "songBar" placeholder= "Song" ref={this.songRef}/></div>
                    <div className= "artistinput"><input type="text" className = "artistBar" placeholder= "Artist" ref={this.artistRef}/></div>
                    <div className="Entry"><textarea rows="4" cols="50" name="comment" form="usrform" className="entryBar" placeholder= "What's your vibe today?"ref={this.entryRef}/></div>

                   
                <div className= "calendar">
                    <select id = "day" ref={this.dayRef} onChange = {this.handleOnChange}>
                    </select>

                    <select id= "month" ref={this.monthRef} onChange = {this.handleOnChange}>
                    </select>

                    <select id= "year" ref={this.yearRef} onChange = {this.handleOnChange}>
                        <option value="year-default">Year</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                    </select>
                </div>
                    
                    <p id="select-vibe-text"> Select a vibe: </p>
                    <div className = "vibes">
    
                        <div className= "vibe" id="happy" onClick= {this.handleClick}>😁</div>
                        <div className= "vibe" id = "okay" onClick= {this.handleClick}>🙂</div>
                        <div className= "vibe" id = "neutral" onClick= {this.handleClick}>😐</div>
                        <div className= "vibe" id = "sad" onClick= {this.handleClick}>🙁</div>
                        <div className= "vibe" id = "cool" onClick= {this.handleClick}>😎</div>
                        <div className= "vibe" id = "awkward" onClick= {this.handleClick}>🙃</div>
                        <div className= "vibe" id = "ecstatic" onClick= {this.handleClick}>🤩</div>
                        <div className= "vibe" id = "smirky" onClick= {this.handleClick}>😏</div>
                        <div className= "vibe" id = "unfortunate" onClick= {this.handleClick}>😪</div>
                        <div className= "vibe" id="worried" onClick= {this.handleClick}> 😟 </div>
                        <div className= "vibe" id= "overwhelmed" onClick= {this.handleClick}> 😭 </div>
                        <div className= "vibe" id= "defeated" onClick= {this.handleClick}> 😞 </div>
                        <div className= "vibe" id= "please" onClick= {this.handleClick}> 🥺 </div>
                    </div>
                    <button className = "go" onClick = {this._clicked}>
                    Submit
                    </button>
                </div>

                {/* <button className = "go" onClick = {() => this._clicked()}>
                    Submit
                </button>
 */}
            </div>
        );
    }
}

export default withRouter(Home);