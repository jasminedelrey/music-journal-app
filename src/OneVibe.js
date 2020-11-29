import React, { Component } from 'react';
import All from './All';
import './Journal.css';
import {withRouter} from "react-router";

class OneVibe extends Component {

    constructor() {
        super();
        this.state = {
            entry : undefined,
            matches : undefined,
            songs : [],
            vibe : "Choose a vibe playlist"
        }
    }

    componentDidMount() {

        let dropdown = document.getElementById('vibe-dropdown');
        dropdown.length = 0;
        let defaultOption = document.createElement('option');
        defaultOption.text = "Choose a vibe playlist";
        dropdown.add(defaultOption);
        dropdown.selectedIndex = 0;

        for (let i= 0; i < this.props.vibes.length; i++) {
            let option = document.createElement('option');
            option.text = this.props.vibes[i]
            option.value = this.props.vibes[i]
            option.id = this.props.vibes[i]
            dropdown.add(option)
        }


        // for (let i= 0; i < this.props.vibes.length; i++) {
        //     let vibe = this.props.vibes[i]
        //     console.log(vibe)
        //     let aArray = []
        //     let sArray = []
        //     fetch(`http://localhost:5000/journal-entries/${vibe}`)
        //     .then(response => response.json())
        //     .then(result => {
        //         this.setState({
        //             entry : result
        //         })
        //         console.log(vibe)
        //         console.log(this.state.entry)

        //         for (let i = 0; i < this.state.entry.length; i++) {
        //             aArray.push(this.state.entry[i].song + " by " + this.state.entry[i].artist)
        //             vibeMatches[vibe] = aArray
        //         }
        //         console.log("helloooooo")
        //         // vibeMatches[vibe] = aArray
        //         array.push(vibeMatches[vibe])
        //         console.log(array)
        //         allVibes.push(vibe)
        //         console.log(allVibes)
        //         this.setState({
        //             songs : array,
        //             vibes : allVibes
        //         })

        //         // console.log(vibeMatches)
        //         // sArray.push(vibeMatches)
        //         // console.log(sArray)

        //         // this.setState({
        //         //     matches : sArray
        //         // })

        //         // console.log((this.state.matches))


        //     });   
        // }
    }

    _clicked(){
        let aArray = []
        if(this.state.vibe !== "Choose a vibe playlist") {
            fetch(`http://localhost:5000/journal-entries/${this.state.vibe}`)
            .then(response => response.json())
            .then(result => {
                this.setState({
                 entry : result
                })

                // console.log(vibe)
                // console.log(this.state.entry)
            
                for (let i = 0; i < this.state.entry.length; i++) {
                        aArray.push(this.state.entry[i].song + " by " + this.state.entry[i].artist)
                }
            });
        }
        this.setState({
            songs : aArray
        })
    }

    selectedVibe(event) {
        console.log(event.target.value)
        // this.setState({
        //     vibe : event.target.value
        // })
        // console.log(this.state.vibe)
    }


    render(){

        return(
            <div className = "listed-vibes">
                <h2> vibessss </h2>
                <select onChange = {this.selectedVibe} id= "vibe-dropdown"></select>
                
                <p> {this.props.vibes}</p>
            
            </div>
        )
    }


}

export default OneVibe;