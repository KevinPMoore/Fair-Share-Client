import React from 'react';
import { Link } from 'react-router-dom';
import UserService from '../../services/users-api-service';
import HouseholdService from '../../services/households-api-service';
import ChoreService from '../../services/chores-api-service';
import _ from 'lodash';
import './Household.css';

export default class Household extends React.Component {
    state = {
        allHouseholdChores: [],
        usersArray: [],
        unassignedChores: [],
        toggle: false
    };

    updateToggle = () => {
        this.setState({
            toggle: !this.state.toggle
        });
    };

    //needs partial rework for renderUserChores still not rendering
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
                        {this.getUserChores(user.userid)}
                    </ul>
                </div>
        );
        return(
            <section className='householdusers'>
               {renderUsers} 
            </section>
        );
    };

    //START HERE
    //this is passing the correct information to renderUserChores
    getUserChores = (userid) => {
        console.log('getUserChores ran')
        let userChores = [];
        UserService.getUserChores(userid)
        .then(chores => {
            chores.forEach(chore => userChores.push(chore))
        })
        .then(res => {
            console.log('calling renderUserChores with ', userChores)
            this.renderUserChores(userChores)
        });
    };

    //START HERE
    //this is returning the correct value but nothing is rendering
    renderUserChores = (chores) => {
        console.log('renderUserChores ran')
        let choresToRender = chores.map(chore =>
            <li 
                key={chore.choreid}
            >
                {chore.chorename}
            </li>
            );
        console.log('renderUserChores is returning ', choresToRender)
        return(choresToRender)
    };

    renderChoreList = (chores, users) => {
        let choreList = chores.map(chore =>
            <li 
                id={chore.choreid}
                className='householdchore'
                key={chore.choreid}
            >
                {chore.chorename}
                {this.renderUserButtons(users, chore)}
            </li>
            );
            return(
                <ul className='householdchorelist'>
                    {choreList}
                </ul>
            );
    };

    //needs rework
    renderUserButtons = (users, chore) => {
        let buttons = users.map(user =>
            <button
                key={user.username+user.id}
                id={user.username}
                onClick={() => this.handleAssignChore(user, chore)}
            >
                {user.username}
            </button>
        );
        return(buttons)
    };

    //needs rework
    renderRandomizeButton = (users) => {
        let randomizeButton = 
        <button
            onClick={() => this.handleRandomize(users)}
        >
            Randomize
        </button>
        if(this.state.unassignedChores.length !== 0) {
            return randomizeButton;
        };
    };


    //needs testing to confirm is working
    handleAssignChore = (user, chore) => {
        ChoreService.patchChore(chore.choreid, user.userid, chore.chorehousehold, chore.chorename)
        .then(
            HouseholdService.getHouseholdChores(this.props.household.householdid)
            .then(res => {
                let unassignedChores = res.filter(chore => chore.choreuser !== null)
                this.setState({
                    unassignedChores: unassignedChores
                });
            })
        );
    };

    //needs rework
    handleUnassignAll = () => {
        let newUsersArray = _.cloneDeep(this.props.users);
        newUsersArray.map(user => 
            user.chores = []
        )

        console.log('newUsersArray is ', newUsersArray)

        this.setState({
            unassignedChores: this.props.chores,
            assignedChores: [],
        });

        this.props.updateUsers(newUsersArray)
    };

    //needs rework
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

        this.props.updateUsers(usersWithChores)

        this.setState({
            assignedChores: this.state.assignedChores.concat(choresToRandomize),
            unassignedChores: []
        });
    };

    componentDidMount() {       
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
                    {this.props.household.householdid}
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
                    {this.renderChoreList(this.state.unassignedChores, this.state.usersArray)}
                    <button
                        onClick={this.handleUnassignAll}
                    >
                        Unassign All
                    </button>
                    {/*this.renderRandomizeButton(users)*/}
                </section>
            </div>
        )
    }
}