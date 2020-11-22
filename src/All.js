import React, { Component } from 'react';
import './All.css';
import {withRouter} from "react-router";

class All extends Component {

    constructor() {
        super();
        this.state = {
            villager: undefined 
        }
    }

    componentDidMount(){
        let villagerName= this.props.match.params;
        fetch(`https://localhost:3000/journal-entries`)
        .then(response => response.json())
        .then(result => {
            this.setState({
                villager: result
            })

        })
    }


    render(){
        return(
            <div>
                {(this.state.villager !== undefined) ?
                    (this.state.villager.length !== 0) ?
                    <div className = "villager"> 
                        <h1> {this.state.villager[0].name} </h1>
                        <img src = {this.state.villager[0].image} alt={this.state.villager[0].name}/>
                        <p> Hobby: {this.state.villager[0].hobby}</p>
                    </div>
                    :
                    "Villager not found." 

                :
                ""
                }

            </div>
        )
    }


}

export default withRouter(All);