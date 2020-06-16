import React from 'react';
import { Link } from 'react-router-dom';
import Store from '../../store';
import './Household.css';

export default class Household extends React.Component {

    //this will use similar logic to the demo page

    render() {
        const users = Store.storedUsers;

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