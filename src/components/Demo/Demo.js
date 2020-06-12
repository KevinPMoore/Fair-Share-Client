import React from 'react';
import Store from '../../store';
import './Demo.css';
import store from '../../store';

export default class Demo extends React.Component {
    state = {
        assignedChores: [],
        unassignedChores: [],
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

    renderUserButtons = (users) => {
        let buttons = users.map(user =>
            <button
                //some button properties
            >
                {user.username}
            </button>
        );
        return(buttons)
    };

    //add buttons to being rendered
    renderChoreList = (chores, users) => {
        console.log('chores are ', chores)
        let choreList = chores.map(chore =>
            <li 
                id={chores.indexOf(chore)}
                className='demochore'
                draggable='true'
                onDragStart={this.handleDrag}
                key={chores.indexOf(chore)}
            >
                {chore}
                {this.renderUserButtons(users)}
            </li>
            );
            return(
                <ul className='demochorelist'>
                    {choreList}
                </ul>
            )
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