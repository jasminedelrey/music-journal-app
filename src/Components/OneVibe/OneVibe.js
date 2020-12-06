import React, { Component } from 'react';
import './OneVibe.css'

class OneVibe extends Component {

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