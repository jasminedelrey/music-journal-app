import React, { Component } from 'react';
import './Vibe.css';
import {withRouter} from "react-router";
import OneVibe from '../OneVibe/OneVibe'

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

let mango = [];
let useremail = '';
class Vibe extends Component {

    constructor() {
        super();
        this.state = {
            entry : undefined,
            vibe_category : {},
            presentVibes : [],
            presentSongs : [],
            test :[],
            hehe : [],
            presentMatches : [],
            userInfo: ''
        }
        // this.selectedVibe = this.selectedVibe.bind(this);
        this.goBack = this.goBack.bind(this);
    }

// }

    componentDidMount(){
        const {useremail} = this.props.match.params;
        console.log(useremail)
        this.setState({
            userInfo:useremail
        })
        let vibeMatches = {};
        let selected_vibes = [];
        let selectedSongs = []

        // let dropdown = document.getElementById('vibe-dropdown');
        // let buttons = document.getElementById('buttons');
        // dropdown.length = 0;
        // let defaultOption = document.createElement('option');
        // defaultOption.text = "Choose a vibe playlist";
        // dropdown.add(defaultOption);
        // dropdown.selectedIndex = 0;


        let p = [];
        let objects = '';
        fetch(`http://localhost:5000/journal-entries/${useremail}`)
        .then(response => response.json())
        .then(result => {

            if (result !== undefined) {
                let vibeComponent = (result).map(e => {
                    // console.log(e.vibe)
                    if (e.vibe === null) {
                        console.log("no vibes here!")
                    }
                    else{
                        console.log(e.vibe.length)
                            for (let i=0; i < (e.vibe).length; i++) {
                                if(p.indexOf(e.vibe[i]) === -1){
                                    p.push(e.vibe[i])
                                }
                        }
                    }
                })
            }


        for (let i= 0; i < p.length; i++) {
            // let option = document.createElement('option');
            let button = document.createElement('button')
            button.innerHTML = emotions[p[i]]
            button.id = p[i]
            button.className = "vibe-buttons"
            button.onclick = (event => {
                let selected_button = document.getElementById(event.target.id)
                console.log(event.target.id)

                let array =[]

                let selection = event.target.id
                console.log("selected vibes array" + selected_vibes)
                if (selected_vibes.indexOf(event.target.id) === -1){
                    selected_button.classList.add("show")
                    selected_vibes.push(event.target.id)

                    fetch(`http://localhost:5000/journal-entries/${this.state.userInfo}/${selection}`)
                    .then(response => response.json())
                    .then(result => {
                        for(let i=0; i<result.length;i++) {
                            array.push(result[i].song + " by " + result[i].artist)
                            vibeMatches[selection] = array
                            console.log(vibeMatches)
                            let q = []
                            console.log(Object.keys(vibeMatches))
                            
                            for(let i=0; i< Object.keys(vibeMatches).length; i++){
                                if(Object.values(vibeMatches)[i] !== null){
                                for(let j=0; j<(Object.values(vibeMatches)[i]).length; j++){
                                    if(q.indexOf(Object.values(vibeMatches)[i][j]) === -1) {
                                        q.push(Object.values(vibeMatches)[i][j])
                                    }
                                    console.log(q[0])
                                }
            
                            }
                            }


                        this.setState({
                            test : array,
                            hehe : mango,
                            presentMatches : q
                        })

                        console.log("STATE FOR Q ARRAY " + this.state.presentMatches)
                    }
                });

                objects = Object.entries(vibeMatches)
                    
                for(let i= 0; i< objects; i++) {
                    if(objects[i].value !== null) {
                        selectedSongs.push(objects[i].value)
                    }
                }
                }
                
                else {
                    for(let i= 0; i < selected_vibes.length; i++) {
                        if(selected_vibes[i] === event.target.id) {
                            selected_vibes.splice(i,1);
                            
                        }
                    }
                    console.log("YOU JUST DESELECTED" + selection)
                    console.log(vibeMatches)
                
                    
                    objects = Object.entries(vibeMatches)
                    console.log("objects is " + objects)
                    
                    for(let i= 0; i< objects; i++) {
                        if(objects[i].value !== null) {
                            selectedSongs.push(objects[i].value)
                        }
                    }

                    console.log("SELECTED SONGS " + selectedSongs);

                    vibeMatches[selection] = null
                    selected_button.classList.remove("show")

                    let q = []
                    console.log(Object.keys(vibeMatches))
                    
                    for(let i=0; i< Object.keys(vibeMatches).length; i++){
                        if(Object.values(vibeMatches)[i] !== null){
                        for(let j=0; j<(Object.values(vibeMatches)[i]).length; j++){
                            if(q.indexOf(Object.values(vibeMatches)[i][j])=== -1) {
                                q.push(Object.values(vibeMatches)[i][j])
                            }
                            console.log((Object.values(vibeMatches)[i])[0])
                        }
                        }
                    }

                    console.log('Q ARRAY IS ' + q)

                    this.setState({
                        presentMatches : q
                    })


                    console.log(q)

                }

            }).bind(this);
            // option.text = p[i]
            // option.value = p[i]
            // option.id = p[i]
            // dropdown.add(option)
            document.getElementById("vibe-buttons").appendChild(button)
        }

            console.log(this.state.presentMatches)
            console.log("PRESENT MATCHES STATE" + Object.keys(this.state.presentMatches))

        })


    }

    goBack(){
        window.location.href = `/journal-entries/${this.state.userInfo}`;
    }



    render(){
        console.log(this.state.presentMatches)
        let vibeComponent = this.state.presentMatches.map(element => {
            console.log("ELEMENT IS" + element)
            return <OneVibe key= {element}
                            match = {element}
                                    />
        })

            


        return (

        <div className="vibes-page">
            <div id= "go-back-vibes"> 
                <button id= "go-back-button" onClick = {this.goBack}> Back </button>
            </div>
            <h1> Your Vibes</h1>
            <h2> Form a vibe playlist based on your journal entries: </h2>
            <div id="vibe-buttons"> </div>
            <p id= "song-block"> {vibeComponent}</p>

        </div>
        )
        }


}

export default withRouter(Vibe);