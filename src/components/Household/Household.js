import React from 'react';
import { Link } from 'react-router-dom';
import HouseholdService from '../../services/households-api-service';
import ChoreService from '../../services/chores-api-service';
import './Household.css';

export default class Household extends React.Component {
    state = {
        allHouseholdChores: [],
        usersArray: [],
        unassignedChores: []
    };

    //Makes a call to the server for the household's users and chores before setting them to state
    setStateFromServer = () => {
        HouseholdService.getHouseholdUsers(this.props.household.householdid)
        .then(res => {
            this.setState({
                usersArray: res
            });
        });

        HouseholdService.getHouseholdChores(this.props.household.householdid)
        .then(res => {
            let unassignedChores = res.filter(chore => chore.choreuser === null)
            this.setState({
                allHouseholdChores: res,
                unassignedChores: unassignedChores
            });
        });
    };

    //Creates HTML elements for each user
    renderUsers = (users) => {
        let renderUsers = users.map(user => 
                <div 
                    key={user.userid}
                    id={user.username+user.id}
                    className='householduser'
                >
                    <p className='householdusername'>{user.username}</p>
                    <ul 
                        className='householduserchores'
                    >
                        {this.renderUserChores(user.userid)}
                    </ul>
                </div>
        );
        return(
            <section className='householdusers'>
               {renderUsers} 
            </section>
        );
    };

    //Filters through household chores for ones that match a userid
    //Then renders those chores as li items
    renderUserChores = (userid) => {
        let assignedChores = this.state.allHouseholdChores.filter(chore => chore.choreuser === userid);
        let choresToRender = assignedChores.map(chore =>
            <li
                className='userassignedchore'
                key={chore.choreid}
            >
                {chore.chorename}
            </li>
        );
        return(choresToRender);
    };

    //Loops through chores and renders li elements for each
    renderChoreList = (chores, users) => {
        let choreList = chores.map(chore =>
            <li 
                id={chore.choreid}
                className='householdchore'
                key={chore.choreid}
            >
                {chore.chorename}
                <div
                    className='householduserbuttonscontainer'
                >
                    {this.renderUserButtons(users, chore)}
                </div>
            </li>
            );
            return(
                <ul className='householdchorelist'>
                    {choreList}
                </ul>
            );
    };

    //Creates a button for each user to assign a chore to call handleAssignChore for that user
    renderUserButtons = (users, chore) => {
        let buttons = users.map(user =>
            <button
                key={user.username+user.id}
                className='householduserassignbutton'
                id={user.username}
                onClick={() => this.handleAssignChore(user, chore)}
            >
                {user.username}
            </button>
        );
        return(buttons)
    };

    //Renders button to call handleRandomize only if there are unassigned chores that can be randomized
    renderRandomizeButton = (unassignedChores) => {
        let users = this.state.usersArray;
        let randomizeButton = 
        <button
            className='householdrandomizebutton'
            onClick={() => this.handleRandomize(users)}
        >
            Randomize
        </button>
        if(unassignedChores.length !== 0) {
            return randomizeButton;
        };
    };

    //Sends a patch request for a chore to set the choreuser field to match the userid of the user
    handleAssignChore = (user, chore) => {
        console.log('user being assigned is ', user)
        console.log('chore to assign is ', chore)
        ChoreService.patchChore(chore.choreid, user.userid, chore.chorehousehold, chore.chorename)
        .then(() => {
            return this.setStateFromServer();
        });
    };

    //Sends a patch request for each chore that has a non-null choreuser field to set that field to null
    //Then resets state by pulling chores from the server
    handleUnassignAll = () => {
        let assignedChores = this.state.allHouseholdChores.filter(chore => chore.choreuser !== null);

        Promise.allSettled(assignedChores.map(chore => {
            return ChoreService.patchChore(chore.choreid, null, chore.chorehousehold, chore.chorename)}))
        .then(() => {
            return this.setStateFromServer();
        });
    };

    //Shuffles an array of chores, then chunks that array such that each chunk is equally divided among users
    //The chunked array is shuffled then the chores are patched to assign them to a user
    handleRandomize = (users) => {
        let choresToRandomize = this.state.unassignedChores;
        let chunkSize = Math.ceil(choresToRandomize.length / users.length);

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

        function chunk(array, size) {
            let returnArray = [];
            for(let index = 0; index < array.length; index += size) {
               let bucket = array.slice(index, index + size);
               returnArray.push(bucket);
            }
            return returnArray;
        };

        let chunkedChores = chunk(shuffledChores, chunkSize);
        let shuffledAndChunkedChores = shuffle(chunkedChores);

        function distributeChores(users, chores) {
            let tempArray = [];
            for(let i = 0; i < chores.length; i ++) {
                tempArray.push(...chores[i].map(chore => ChoreService.patchChore(chore.choreid, users[i].userid, chore.chorehousehold, chore.chorename)));
            };
            return Promise.allSettled(tempArray);
        };

        distributeChores(users, shuffledAndChunkedChores).then(() => this.setStateFromServer());
    };

    componentDidMount() {       
        this.setStateFromServer();
    };

    render() {
        return(
            <div 
                className='household'
            >
                <h2>
                    {this.props.household.householdname}
                </h2>
                <h3
                    className='householdid'
                >
                    ID: {this.props.household.householdid}
                </h3>
                <Link
                    className='managelink'
                    to='/manage'
                >
                    Manage
                </Link>
                {this.renderUsers(this.state.usersArray)}
                <section 
                    className='householdchores'
                >
                    <p
                        className='householdchoreheading'
                    >
                        Chores
                    </p>
                    {this.renderChoreList(this.state.unassignedChores, this.state.usersArray)}
                    <div
                        className='householdchorebuttons'
                    >
                        <button
                            className='householdunassignbutton'
                            onClick={this.handleUnassignAll}
                        >
                            Unassign All
                        </button>
                        {this.renderRandomizeButton(this.state.unassignedChores)}
                    </div>
                </section>
            </div>
        );
    };
};