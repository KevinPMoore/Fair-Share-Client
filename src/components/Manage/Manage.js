import React from 'react';
import { Link } from 'react-router-dom';
import './Manage.css';

export default class Manage extends React.Component {

    //use props passed from app

    //remove user button doesnt do anything yet
    renderUsers = (users) => {
        let usersToRender = users.map(user =>
                <li
                   key={user.id}
                   id={user.id} 
                   className='manageuser'
                >
                    <p className='manageusername'>
                        {user.username}
                    </p>
                    <button
                        className='manageuserbutton'
                    >
                        Remove User
                    </button>
                </li>
        );
        return(
            <ul className='manageuserlist'>
                {usersToRender}
            </ul>
        );
    };

    renderChores = (chores) => {
        let choresToRender = chores.map(chore =>
            <li
                key={chores.indexOf(chore)}
                id={chores.indexOf(chore)}
                className='managechore'
            >
                <p className='managechorename'>
                    {chore}    
                </p>
                <button
                    className='managechorebutton'
                >
                    Remove Chore
                </button>
            </li>
        );
        return(
            <ul className='managechorelist'>
                {choresToRender}
            </ul>
        );
    };
    
    render() {
        return(
            <div className='manage'>
                <h2>
                   {this.props.currentHousehold}
                </h2>
                <h3>
                    #1234
                </h3>
                <div className='manageusers'>
                    <span>
                        Users
                    </span>
                    {this.renderUsers(this.props.users)}
                </div>
                <div className='managechores'>
                    <span>
                        Chores
                    </span>
                    {this.renderChores(this.props.chores)}
                    <Link
                        to='/addchore'
                        className='addchorelink'
                    >
                        <button>
                            Add more
                        </button>
                    </Link>
                </div>
            </div>
        );
    };
};