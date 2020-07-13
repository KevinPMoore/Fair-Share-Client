import React from 'react';
import AddChore from '../AddChore/AddChore';
import HouseholdService from '../../services/households-api-service';
import UserService from '../../services/users-api-service';
import ChoreService from '../../services/chores-api-service';
import './Manage.css';

export default class Manage extends React.Component {
    state = {
        adding: false,
        modal: 'hidden',
        choresArray: [],
        usersArray: [],
        userToRemove: null,
        warning:''
    };

    updateAdding = () => {
        if(this.state.adding === false) {
            this.setState({
                adding: true
            });
        } else {
            this.setState({
                adding: false
            });
        };
    };

    updateModal = () => {
        if(this.state.modal === 'hiddem') {
            this.setState({
                modal: 'modal'
            })
        } else {
            this.setState({
                modal: 'hidden'
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

    //Makes a call to the server for the household's users and chores before setting them to state
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

    //Displays a modal asking for confirmation before deleting a user
    handleRemoveUserClick = (user) => {
        this.updateWarning(user);
        this.updateModal();
        this.updateUserToRemove(user);
    };

    //Sends delete request to server and if userid matches the logged-in user they are redirected to the userhome component
    removeUser = () => {
        const { location, history } = this.props;
        const destination = (location.state || {}).from || '/userhome';
        if(this.props.user.userid !== this.state.userToRemove.userid) {
            UserService.patchUser(this.state.userToRemove.userid, this.state.userToRemove.username, null, null)
            .then(() => {
                return this.setStateFromServer();
            })
            .then(() => {
                this.updateModal();
            })
        } else {
            UserService.patchUser(this.state.userToRemove.userid, this.state.userToRemove.username, null, null)
            history.push(destination);
            this.props.setHousehold(null);
        };
    };

    //Sends a delete request to the server to remove the chore with the provided choreid
    removeChore = (choreid) => {
        ChoreService.deleteChore(choreid)
        .then(() => {
            return this.setStateFromServer();
        });
    };

    //Creates li elements for each user
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

    //Creates li elements for each chore
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

    //Ternary in render method displays AddChore component based on state
    renderAddChore = () => {
        return(
            <AddChore
                user={this.props.user}
                household={this.props.household}
                updateAdding={this.updateAdding}
                setStateFromServer={this.setStateFromServer}
            />
        );
    };

    //Sets initial state on mount
    componentDidMount() {
        this.setStateFromServer();
    };
    
    render() {
        return(
            <div 
                className='manage'
            >
                <h2>
                   {this.props.household.householdname}
                </h2>
                <h3
                    className='householdid'
                >
                    ID: {this.props.household.householdid}
                </h3>
                <div 
                    className='manageusers'
                >
                    <p
                        className='manageuserheader'
                    >
                        Users
                    </p>
                    {this.renderUsers(this.state.usersArray)}
                </div>
                <div 
                    className='managechores'
                >
                    <p
                        className='managechoreheader'
                    >
                        Chores
                    </p>
                    {this.renderChores(this.state.choresArray)}
                    <button
                        className='addchorebutton'
                        onClick={this.updateAdding}
                    >
                        New Chore
                    </button>
                    {this.state.adding === true ? this.renderAddChore() : null}
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