import React from 'react';
import Store from '../../store';
import './Demo.css';
import { Link } from 'react-router-dom';
import _ from 'lodash';


export default class Demo extends React.Component {
    state = {
        assignedChores: [],
        unassignedChores: _.cloneDeep(Store.storedChores),
        users: _.cloneDeep(Store.storedUsers)
    };

    updateUserChores = (user, chore) => {
        let updatedUser = {
            id: user.id,
            username: user.username,
            chores: user.chores.concat(chore)
        };

        let copyOfUsers = this.state.users;

        copyOfUsers[copyOfUsers.indexOf(user)] = updatedUser;

        this.setState({
            assignedChores: this.state.assignedChores.concat(chore),
            unassignedChores: this.state.unassignedChores.filter(chores => chores !== chore),
            users: copyOfUsers
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
                className='demoassignedchore'
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
                <div
                    className='demouserbuttonscontainer'
                >
                    {this.renderUserButtons(users, chore)}
                </div>
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
                className='demouserassignbutton'
                id={user.id}
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
            className='demorandomizebutton'
            onClick={() => this.handleRandomize(users)}
        >
            Randomize
        </button>

        console.log('unassignedChores lenth is ', this.state.unassignedChores.length);

        if(this.state.unassignedChores.length !== 0) {
            return randomizeButton;
        };
    };

    handleUnassignAll = () => {
        console.log('stored users ', Store.storedUsers)
        this.setState({
            unassignedChores: _.cloneDeep(Store.storedChores),
            assignedChores: [],
            users: _.cloneDeep(Store.storedUsers)
        });
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
                users[i].chores = users[i].chores.concat(chores[i])
              }
              return users;
        };

        let usersWithChores = distribute(users, shuffledAndChunkedChores)
        console.log('users with chores are ', usersWithChores);

        this.setState({
            assignedChores: this.state.assignedChores.concat(choresToRandomize),
            unassignedChores: []
        });
    };

    render() {

        return(
            <div className='demo'>
                <h2>
                    Demo House
                </h2>
                {this.renderUsers(this.state.users)}
                <section 
                    className='demochores'
                >
                    <p 
                        className='demochoreheading'
                    >
                        Chores
                    </p>
                    {this.renderChoreList(this.state.unassignedChores, this.state.users)}
                    <div className='demochorebuttons'>
                        <button
                            className='demounassignbutton'
                            onClick={this.handleUnassignAll}
                        >
                            Unassign All
                        </button>
                        {this.renderRandomizeButton(this.state.users)}
                    </div>
                </section>
                <footer
                    className='demofooter'
                >
                    <Link
                        to='/register'
                    >
                        <button
                            className='demofooterbutton'
                        >
                            Register
                        </button>
                    </Link>
                </footer>
            </div>
        );
    };
};