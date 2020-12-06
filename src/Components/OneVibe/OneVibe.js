import React, { Component } from 'react';
import './OneVibe.css'

class OneVibe extends Component {
    constructor() {
        super();
        this.state = {
            vibeSongs : ""
        }
    }

    // componentDidMount() {
    //     for (let i=0; i< this.props.match.length; i++) {
    //         console.log(this.props.match[i])
    //     }
    // }

    render(){



        return(
            <div className="all-vibes-div">
            <div className = "listed-vibes">
                <p> {this.props.match}</p>
            
            </div>
            </div>
        )
    }


}

export default OneVibe;