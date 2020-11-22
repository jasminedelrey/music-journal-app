import React, { Component } from 'react';
import './Home.css';
import {withRouter} from "react-router";
import GoogleBtn from './GoogleBtn'


class Home extends Component {
    constructor(){
        super();
        this.nameRef = React.createRef();
        this.artistRef = React.createRef();
        this.entryRef = React.createRef();
    }
    _clicked(){
        //console.log(this.inputRef.current.value);
        window.location.href=`/results/${this.inputRef.current.value}`;
    }

    render() {
        return(
            <div className = "Home">
                <h1> Welcome to the home page.</h1>

                <div className = "search-container">
                    Name: <input type="text" ref={this.nameRef}/>
                    Artist: <input type="text" ref={this.artistRef}/>
                    Entry: <textarea rows="4" cols="50" name="comment" form="usrform" ref={this.entryRef}/>

                    <select name= "day">
                        <option value="01">01</option>
                        <option value="01">03</option>
                        <option value="01">04</option>
                    </select>
                    <select name= "month">
                        <option value="09">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                    </select>
                    <select name= "year">
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                    </select>

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