import React, { Component } from 'react';
import './Vibe.css';
import {withRouter} from "react-router";
import OneVibe from './OneVibe'

class Vibe extends Component {

    constructor() {
        super();
        this.state = {
            entry : undefined,
            vibe_category : {},
            presentVibes : [],
            presentSongs : []
        }
        this.selectedVibe = this.selectedVibe.bind(this);
    }

    componentDidMount(){

        let dropdown = document.getElementById('vibe-dropdown');
        dropdown.length = 0;
        let defaultOption = document.createElement('option');
        defaultOption.text = "Choose a vibe playlist";
        dropdown.add(defaultOption);
        dropdown.selectedIndex = 0;


        let p = [];
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
            let option = document.createElement('option');
            option.text = p[i]
            option.value = p[i]
            option.id = p[i]
            dropdown.add(option)
        }

            console.log(p)

        })

    }

    selectedVibe(event){
        let array =[]
        console.log(event.target.value)
        let selection = event.target.value
        fetch(`http://localhost:5000/journal-entries/${selection}`)
            .then(response => response.json())
            .then(result => {
                for(let i=0; i<result.length;i++) {
                    array.push(result[i].song + " by " + result[i].artist)
                }

                this.setState({
                    presentSongs : array
                })
            });
            console.log(array)
        console.log(this.state.presentSongs)
}


    render(){

        return (

            <div>
            <h1> Here are your vibes</h1>
            {/* <OneVibe key = "vibes"
                        vibes = {p}
            />
                <button onClick = {this.clickedVibes}> Vibes </button> */}
                <p> present vibes +  {this.state.presentSongs[0]}</p>
                <select onChange = {this.selectedVibe} id= "vibe-dropdown"></select>
                <p> {this.state.presentSongs}</p>

            </div>
        )
        }


}

export default withRouter(Vibe);