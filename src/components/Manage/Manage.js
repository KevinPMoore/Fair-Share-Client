import React from 'react';
import HouseholdService from '../../services/households-api-service';
import UserService from '../../services/users-api-service';
import ChoreService from '../../services/chores-api-service';
import { Link } from 'react-router-dom';
import './Manage.css';

export default class Manage extends React.Component {
    state = {
        modal: 'hide',
        choresArray: [],
        usersArray: [],
        userToRemove: null,
        warning:''
    };

    updateModal = () => {
        if(this.state.modal === 'hide') {
            this.setState({
                modal: 'modal'
            })
        } else {
            this.setState({
                modal: 'hide'
            })
        };
    };

    updateUserToRemove = (userid) => {
        this.setState({
            userToRemove: userid
        });
    };

    updateWarning = (user) => {
        this.setState({
            warning: `You are about to remove ${user.username} from ${this.props.household.householdname}.  Are you sure?`
        });
    };

    setStateFromServer = () => {
        console.log('setStateFromServer ran')
        HouseholdService.getHouseholdUsers(this.props.household.householdid)
        .then(res => {
            this.setState({
                usersArray: res
            });
        });

        HouseholdService.getHouseholdChores(this.props.household.householdid)
        .then(res => {
            this.setState({
                choresArray: res
            });
        });
    };

    handleRemoveUserClick = (user) => {
        this.updateWarning(user);
        this.updateModal();
        this.updateUserToRemove(user);
    };

    removeUser = () => {
        const { location, history } = this.props;
        const destination = (location.state || {}).from || '/userhome';
        if(this.props.user.userid !== this.state.userToRemove.userid) {
            UserService.patchUser(this.state.userToRemove.userid, this.state.userToRemove.username, null, null)
            .then(
                this.setStateFromServer()
            )
            .then(
                this.updateModal()
            )
        } else {
            UserService.patchUser(this.state.userToRemove.userid, this.state.userToRemove.username, null, null)
            history.push(destination);
            this.props.setHousehold(null);
        }
    }

    //needs more attention
    //this is deleting chores but not updating state the first time it runs
    removeChore = (choreid) => {
        ChoreService.deleteChore(choreid)
        .then(
            this.setStateFromServer()
        )
    };

    renderUsers = (users) => {
        let usersToRender = users.map(user =>
                <li
                   key={user.userid}
                   id={user.userid} 
                   className='manageuser'
                >
                    <p 
                        className='manageusername'
                    >
                        {user.username}
                    </p>
                    <button
                        className='manageuserbutton'
                        id={user.userid}
                        onClick={() => this.handleRemoveUserClick(user)}
                    >
                        Remove User
                    </button>
                </li>
        );
        return(
            <ul 
                className='manageuserlist'
            >
                {usersToRender}
            </ul>
        );
    };

    renderChores = chores => {
        let choresToRender = chores.map(chore =>
            <li
                key={chore.choreid}
                className='managechore'
            >
                <p
                    className='managechorename'
                >
                    {chore.chorename}
                </p>
                <button
                    className='managechorebutton'
                    onClick={() => this.removeChore(chore.choreid)}
                >
                    Remove Chore
                </button>
            </li>
        );
        return(
            <ul 
                className='managechorelist'
            >
                {choresToRender}
            </ul>
        );
    };

    renderWarningMessage = (user) => {
        return(
            <p>
                You are about to remove {user.username} from {this.props.household.householdname}.  Are you sure you mean to do this?
            </p>
        );
    };

    componentDidMount() {
        this.setStateFromServer();
    };
    
    render() {
        return(
            <div 
                className='manage'
            >
                <button
                    onClick={() =>  this.setStateFromServer()}
                >
                    SET STATE FROM SERVER TEST BUTTON
                </button>
                <h2>
                   {this.props.household.householdname}
                </h2>
                <h3
                    className='householdid'
                >
                    {this.props.household.householdid}
                </h3>
                <div 
                    className='manageusers'
                >
                    <span>
                        Users
                    </span>
                    {this.renderUsers(this.state.usersArray)}
                </div>
                <div 
                    className='managechores'
                >
                    <span>
                        Chores
                    </span>
                    {this.renderChores(this.state.choresArray)}
                    <Link
                        to='/addchore'
                        className='addchorelink'
                    >
                        <button>
                            Add more
                        </button>
                    </Link>
                </div>
                <div className={this.state.modal}>
                    <div className='managemodal'>
                        {this.state.warning}
                        <button
                            className='manageconfirm'
                            onClick={this.removeUser}
                        >
                            Confirm
                        </button>
                        <button
                            className='managecancel'
                            onClick={this.updateModal}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    };
};