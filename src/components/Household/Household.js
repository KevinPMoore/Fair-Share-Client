import React from 'react';
import { Link } from 'react-router-dom';
import './Household.css';

export default class Household extends React.Component {
    state = {
        assignedChores: [],
        unassignedChores: []
    };

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

    handleAssignChore = (user, chore) => {
        //needs to assign the chore to a user first
        this.setState({
            assignedChores: this.state.assignedChores.concat(chore),
            unassignedChores: this.state.unassignedChores.filter(chores => chores !== chore),
        })
    }

    handleUnassignAll = () => {

    }

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

        this.props.updateUsers(usersWithChores)

        this.setState({
            assignedChores: this.state.assignedChores.concat(choresToRandomize),
            unassignedChores: []
        });
    };

    componentDidMount() {        
        this.setState({
            unassignedChores: this.props.chores
        });
    };

    //no buttons do anything on click
    //this will be corrected once demo is working
    render() {
        const users = this.props.users;

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
                    {this.renderChoreList(this.state.unassignedChores, this.props.users)}
                    <button>
                        Unassign All
                    </button>
                    {this.renderRandomizeButton(users)}
                </section>
            </div>
        )
    }
}