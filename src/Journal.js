import React, { Component } from 'react';
import All from './All';
import './Journal.css';
import {withRouter} from "react-router";

class Journal extends Component {

    constructor() {
        super();
        this.state = {
            vibes : []
        }
    }

    componentDidMount(){
        let journal_entry = this.props.match.params;
        // let villagerName= this.props.match.params;
        //console.log(villagerName);
        fetch(`http://localhost:5000/journal-entries/${journal_entry}`)
        .then(response => response.json())
        .then(result => {
            this.setState({
                vibes: result.vibe
            })

        })
    }


    render(){
        return(
            <div className = "journal-entry">
                

            </div>
        )
    }


}

export default withRouter(Journal);