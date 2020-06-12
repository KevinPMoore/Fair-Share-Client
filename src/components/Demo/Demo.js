import React from 'react';
import Store from '../../store';
import './Demo.css';
import store from '../../store';

export default class Demo extends React.Component {
    state = {
        assignedChores: [],
        unassignedChores: [],
    };

    updateUserChores = (user, chore) => {
        this.setState({
            assignedChores: this.state.assignedChores.concat(chore),
            unassignedChores: this.state.unassignedChores.filter(chores => chores !== chore),
            [user.username]: {
                id: user.id,
                username: user.username,
                chores: user.chores.push(chore)
            }
        });
    };

    renderUsers = (users) => {
        let renderUsers = users.map(user => 
                <div 
                    key={user.id}
                    id={user.id}
                    className='demouser'
                >
                    <p className='demousername'>{user.username}</p>
                    <ul 
                        className='demouserchores'
                    >
                        {this.renderUserChores(user.chores)}
                    </ul>
                </div>
        );
        return(
            <section className='demousers'>
               {renderUsers} 
            </section>
        );
    };

    renderUserChores = (chores) => {
        let userChores = chores.map(chore =>
            <li>
                {chore}
            </li>
        );
        return(userChores)
    };

    //add buttons to being rendered
    renderChoreList = (chores, users) => {
        let choreList = chores.map(chore =>
            <li 
                id={chores.indexOf(chore)}
                className='demochore'
                draggable='true'
                onDragStart={this.handleDrag}
                key={chores.indexOf(chore)}
            >
                {chore}
                {this.renderUserButtons(users, chore)}
            </li>
            );
            return(
                <ul className='demochorelist'>
                    {choreList}
                </ul>
            )
    };

    renderUserButtons = (users, chore) => {
        console.log('users in renderUserButtons are ', users)
        let buttons = users.map(user =>
            <button
                key={user.username+user.id}
                id={user.username}
                onClick={() => this.updateUserChores(user, chore)}
            >
                {user.username}
            </button>
        );
        return(buttons)
    };

    componentDidMount() {
        const users = Store.storedUsers;
        users.forEach(user =>
            this.setState({
                [user.username]: user
            })  
        );

        this.setState({
            unassignedChores: Store.storedChores
        });
    };

    weirdTest = (ev) => {
        console.log('target value is ', ev.target.id)
    }

    //TODOs:
    //chores can be dragged/dropped
    //unassign resets chore list
    //randomize assigns chores
    render() {
        const users = Store.storedUsers;

        return(
            <div className='demo'>
                <h2>
                    Demo House
                </h2>
                <button
                    id='hey'
                    onClick={this.weirdTest}
                >
                    Stupid button
                </button>
                {this.renderUsers(users)}
                <section className='demochores'>
                    <span className='demovertical'>Chores</span>
                    {this.renderChoreList(this.state.unassignedChores, users)}
                    <div className='demochorebuttons'>
                        <button>
                            Unassign All
                        </button>
                        <button>
                            Randomize
                        </button>
                    </div>
                </section>
            </div>
        );
    };
};