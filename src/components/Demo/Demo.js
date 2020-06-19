import React from 'react';
import Store from '../../store';
import './Demo.css';
import { Link } from 'react-router-dom';

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
                    id={user.username+user.id}
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
                className='demochore'
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
            );
    };

    renderUserButtons = (users, chore) => {
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

    renderRandomizeButton = (users) => {
        let randomizeButton = 
        <button
            onClick={() => this.handleRandomize(users)}
        >
            Randomize
        </button>

        console.log('unassignedChores lenth is ', this.state.unassignedChores.length);

        if(this.state.unassignedChores.length !== 0) {
            return randomizeButton;
        };
    };

    //duplicates <li> items even though this sets state correctly
    handleUnassignAll = () => {
        const users = Store.storedUsers;
        if(this.state.assignedChores.length !== 0) {
            users.forEach(user =>
                this.setState({
                    [user.username]: {
                        id: user.id,
                        username: user.username,
                        chores: []
                    }
                })
            )
            this.setState({
                unassignedChores: Store.storedChores,
                assignedChores: []
            })
        };
    };

    handleRandomize = (users) => {
        let choresToRandomize = this.state.unassignedChores;
        console.log('unassigned chores to randomize are ', choresToRandomize);

        let chunkSize = Math.ceil(choresToRandomize.length / users.length);
        console.log('chunkSize is ', chunkSize);

        function shuffle(array) {
            let returnArray = [];
            while(returnArray.length < array.length) {
                const j = Math.floor(Math.random() * array.length);
                if(!returnArray.includes(array[j])) {
                  returnArray.push(array[j])
                }
              }
              return returnArray;
        };

        let shuffledChores = shuffle(choresToRandomize);
        console.log('shuffledChores are ', shuffledChores);

        function chunk(array, size) {
            let returnArray = [];
            for(let index = 0; index < array.length; index += size) {
               let bucket = array.slice(index, index + size);
               returnArray.push(bucket);
            }
            return returnArray;
        };

        let chunkedChores = chunk(shuffledChores, chunkSize);
        console.log('chunkedChores are ', chunkedChores);

        let shuffledAndChunkedChores = shuffle(chunkedChores);

        function distribute(users, chores) {
            for(let i = 0; i < users.length; i++) {
                users[i].chores = chores[i]
              }
              return users;
        };

        let usersWithChores = distribute(users, shuffledAndChunkedChores)
        console.log('users with chores are ', usersWithChores);

        usersWithChores.forEach(user =>
            this.setState({
                [users.username]: user
            })
        );

        this.setState({
            assignedChores: this.state.assignedChores.concat(choresToRandomize),
            unassignedChores: []
        });
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
                        <button
                            onClick={this.handleUnassignAll}
                        >
                            Unassign All
                        </button>
                        {this.renderRandomizeButton(users)}
                    </div>
                </section>
                <footer
                    className='demofooter'
                >
                    <Link
                        to='/register'
                    >
                        Register
                    </Link>
                </footer>
            </div>
        );
    };
};