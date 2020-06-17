import React from 'react';
import { Link } from 'react-router-dom';
import './Household.css';

export default class Household extends React.Component {

    //use props passed from app

    //this will use similar logic to the demo page
    
    renderUsers = (users) => {
        let renderUsers = users.map(user => 
                <div 
                    key={user.id}
                    id={user.username+user.id}
                    className='householduser'
                >
                    <p className='householdusername'>{user.username}</p>
                    <ul 
                        className='householduserchores'
                    >
                        {this.renderUserChores(user.chores)}
                    </ul>
                </div>
        );
        return(
            <section className='householdusers'>
               {renderUsers} 
            </section>
        );
    };

    renderUserChores = (chores) => {
        let userChores = chores.map(chore =>
            <li
                key={chores.indexOf(chore)}
            >
                {chore}
            </li>
        );
        return(userChores)
    };

    renderChoreList = (chores, users) => {
        let choreList = chores.map(chore =>
            <li 
                id={chores.indexOf(chore)}
                className='householdchore'
                key={chores.indexOf(chore)}
            >
                {chore}
                {this.renderUserButtons(users, chore)}
            </li>
            );
            return(
                <ul className='householdchorelist'>
                    {choreList}
                </ul>
            );
    };

    renderUserButtons = (users, chore) => {
        let buttons = users.map(user =>
            <button
                key={user.username+user.id}
                id={user.username}
            >
                {user.username}
            </button>
        );
        return(buttons)
    };

    //no buttons do anything on click
    //this will be corrected once demo is working
    render() {
        return(
            <div 
                className='household'
            >
                <h2>
                    {this.props.currentHousehold}
                </h2>
                <h3
                    className='householdid'
                >
                    #1234
                </h3>
                <Link
                    className='managelink'
                    to='/manage'
                >
                    Manage
                </Link>
                {this.renderUsers(this.props.users)}
                <section 
                    className='householdchores'
                >
                    {this.renderChoreList(this.props.chores, this.props.users)}
                    <button>
                        Unassign All
                    </button>
                    <button>
                        Randomize
                    </button>
                </section>
            </div>
        )
    }
}