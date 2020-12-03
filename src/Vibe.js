import React, { Component } from 'react';
import './Vibe.css';
import {withRouter} from "react-router";
import OneVibe from './OneVibe'

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
            presentMatches : []
        }
        // this.selectedVibe = this.selectedVibe.bind(this);
    }

//     selectedVibe(event){
//         let array =[]
//         console.log(event.target.value)
//         let selection = event.target.value
//         fetch(`http://localhost:5000/journal-entries/${selection}`)
//             .then(response => response.json())
//             .then(result => {
//                 for(let i=0; i<result.length;i++) {
//                     array.push(result[i].song + " by " + result[i].artist)
//                 }

//                 this.setState({
//                     presentSongs : array
//                 })
//             });
//             console.log(array)
//         console.log(this.state.presentSongs)
// }

    componentDidMount(){

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
        fetch(`http://localhost:5000/journal-entries`)
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
            button.onclick = event => {
                let selected_button = document.getElementById(event.target.id)
                console.log(event.target.id)

                let array =[]

                let selection = event.target.id
                console.log("selected vibes array" + selected_vibes)
                if (selected_vibes.indexOf(event.target.id) === -1){
                    selected_button.classList.add("show")
                    selected_vibes.push(event.target.id)

                    fetch(`http://localhost:5000/journal-entries/${selection}`)
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
                                    q.push(Object.values(vibeMatches)[i])
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

                // let q = []
                //     console.log(Object.keys(vibeMatches))
                    
                //     for(let i=0; i< Object.keys(vibeMatches).length; i++){
                //         if(Object.values(vibeMatches)[i] !== null){
                //             q.push(Object.keys(vibeMatches)[i])
                //         }
                //     }
                //     this.setState({
                //         presentMatches : q
                //     })


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
                            q.push(Object.values(vibeMatches)[i])
                        }
                    }

                    console.log('Q ARRAY IS ' + q)

                    this.setState({
                        presentMatches : q
                    })

                    console.log("STATE FOR Q ARRAY " + this.state.presentMatches)

                }

            }
            // option.text = p[i]
            // option.value = p[i]
            // option.id = p[i]
            // dropdown.add(option)
            document.body.appendChild(button)
        }

            console.log(p)
            console.log("PRESENT MATCHES STATE" + Object.keys(this.state.presentMatches))

        })


    }

    goBack(){
        window.location.href = `/journal-entries`;
    }



    render(){
        let vibeComponent = ""
        // if(this.state.test.length >0){
        //     for(let i=0; i<this.state.test.length; i++){
        //         vibeComponent = <OneVibe key = "test"
        //                                  song = {this.state.test[i]}
        //                         />
        //     }
        // }
        let final_array = [];
        if(this.state.presentMatches.length > 0) {

        
        vibeComponent = this.state.presentMatches.map(e => {
            if (final_array.indexOf(e) === -1) {
                <OneVibe key= "key"
                         match = {e}

                />
                // final_array.push(this.state.presentMatches[i]);
            }
        }) 
        }

        return (

            <div>
            <h1> Here are your vibes</h1>
            <p> {vibeComponent}</p>
            {/* <OneVibe key = "vibes"
                        vibes = {p}
            />
                <button onClick = {this.clickedVibes}> Vibes </button> */}
                {/* <p> present vibes +  {this.state.presentSongs[0]}</p>
                <select onChange = {this.selectedVibe} id= "vibe-dropdown"></select> */}
                <p> {this.state.test}</p>
                <p> PRESENT MATCHES: {this.state.presentMatches}</p>
                <p> this is mango {this.state.hehe}</p>
                <button onClick = {this.goBack}> Back </button>

            </div>
        )
        }


}

export default withRouter(Vibe);