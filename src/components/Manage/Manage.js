import React from 'react';
import { Link } from 'react-router-dom';
import Store from '../../store';
import './Manage.css';

export default class Manage extends React.Component {
    state = {
        users: [],
        chores: []
    };

    componentDidMount() {
        this.setState({
            users: Store.storedUsers,
            chores: Store.storedChores
        });
    };
    
    render() {
        return(
            <div className='manage'>
                <h2>
                    My Household
                </h2>
                <h3>
                    #1234
                </h3>
                <div className='manageusers'>
                    <span>
                        Users
                    </span>

                </div>
                <div className='managechores'>
                    <span>
                        Chores
                    </span>

                </div>
            </div>
        )
    };
};