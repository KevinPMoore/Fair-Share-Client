import React from 'react';
import { Link } from 'react-router-dom';
import './Household.css';

export default class Household extends React.Component {

    //use props passed from app

    //this will use similar logic to the demo page
    

    render() {
        return(
            <div className='household'>
                <h2>
                    My Household
                </h2>
                <h3>
                    #1234
                </h3>
            </div>
        )
    }
}