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
            journalId : "",
            day_selection : "",
            month_selection : "",
            year_selection : "",
            date_selection : "",
            emoji_vibe: [],
            _id : ""
        }
        this._clicked = this._clicked.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        }
    _clicked(){
        //console.log(this.inputRef.current.value);
        console.log(this.artistRef.current.value);
        console.log(this.songRef.current.value);
        const new_journal_entry = { _id: "aioenfapwinefapisdfsdf", 
                                    date: this.state.month_selection + "-" + this.state.day_selection + "-" + this.state.year_selection,
                                    vibe: this.state.emoji_vibe,
                                    artist: this.artistRef.current.value,
                                    song: this.songRef.current.value,
                                    entry: this.entryRef.current.value
                                    };
        axios.post('http://localhost:5000/addNewJournal', new_journal_entry)
            .then(response => this.setState({ journalId: response.data._id }));
    
        window.location.href=`/journal-entries`;
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
        // if (this.state.month_selection !== "" && this.state.day_selection !== "" && this.state.year_selection !== "") {
        //         this.setState({
        //             _id : date

        //         })
        
    }

    render() {
        return(
            <div className = "Home">
                <h1> Welcome to the home page.</h1>

                <div className = "search-container">
                    Song: <input type="text" ref={this.songRef}/>
                    Artist: <input type="text" ref={this.artistRef}/>
                    Entry: <textarea rows="4" cols="50" name="comment" form="usrform" ref={this.entryRef}/>

                    <select id = "day" ref={this.dayRef} onChange = {this.handleOnChange}>
                        <option value="day-default">day</option>
                        <option value="01">01</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>

                    </select>
                    <select id= "month" ref={this.monthRef} onChange = {this.handleOnChange}>
                        <option value="month-default">month</option>
                        <option value="11">06</option>
                        <option value="11">07</option>
                        <option value="11">08</option>
                        <option value="09">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                    </select>
                    <select id= "year" ref={this.yearRef} onChange = {this.handleOnChange}>
                        <option value="year-default">year</option>
                        <option value="2018">2018</option>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                    </select>
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