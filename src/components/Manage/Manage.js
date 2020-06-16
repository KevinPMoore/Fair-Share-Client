import React from 'react';
import { Link } from 'react-router-dom';
import './Manage.css';

export default class Manage extends React.Component {

    //use props passed from app
    
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