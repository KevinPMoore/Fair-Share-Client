import React from 'react';
import { Link } from 'react-router-dom';
import HouseholdService from '../../services/households-api-service';
import ChoreService from '../../services/chores-api-service';
import './Household.css';

export default class Household extends React.Component {
    state = {
        allHouseholdChores: [],
        usersArray: [],
        unassignedChores: [],
    };

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

    //needs more attention
    //only working on second click?
    handleAssignChore = (user, chore) => {
        ChoreService.patchChore(chore.choreid, user.userid, chore.chorehousehold, chore.chorename)
        .then(
            this.setStateFromServer()
        );
    };

    //needs more attention
    //only working on second click?
    handleUnassignAll = () => {
        let assignedChores = this.state.allHouseholdChores.filter(chore => chore.choreuser !== null);
        assignedChores.forEach(chore => {
            ChoreService.patchChore(chore.choreid, null, chore.chorehousehold, chore.chorename)
            .then(
                this.setStateFromServer()
            );
        });
    };

    //needs more attention
    //randomizing correctly but not rerendering correctly on first click?
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
            for(let i = 0; i < chores.length; i ++) {
                chores[i].forEach(chore => {
                    ChoreService.patchChore(chore.choreid, users[i].userid, chore.chorehousehold, chore.chorename)
                });
            };
        };

        distributeChores(users, shuffledAndChunkedChores)
        this.setStateFromServer();
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
        )
    }
}