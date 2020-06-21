import React from 'react';
import { Link } from 'react-router-dom';
import './Manage.css';

export default class Manage extends React.Component {
    state = {
        modal: 'hide'
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

    removeUser = (ev) => {
        let idToRemove = parseInt(ev.target.id);
        let newUsers = this.props.users.filter(user => user.id !==idToRemove);
        let found = false;
        for(let i = 0; i < newUsers.length; i++) {
            if(newUsers[i].username === this.props.userName) {
                found = true;
            }
        };

        if(found !== false) {
            this.props.updateUsers(newUsers)
        } else {
            this.updateModal();
        };
    };

    removeSelf = () => {
        let userToRemove = this.props.username;
        let newUsers = this.props.users.filter(user => user.username !== userToRemove);
        const { location, history } = this.props;
        const destination = (location.state || {}).from || '/userhome';
        this.props.updateUsers(newUsers);
        this.props.removeHousehold(this.props.currentHousehold);
        history.push(destination);
    };

    removeChore = (ev) => {
        let newUsersArray = [];
        this.props.users.forEach(user => {
            let updatedUser = {
                id: user.id,
                username: user.username,
                chores: user.chores.filter(chore => chore !== ev.target.value)
            };
            newUsersArray.push(updatedUser);
        });
        this.props.updateUsers(newUsersArray);
        let idToRemove = parseInt(ev.target.id);
        let newChores = this.props.chores.filter(chore => this.props.chores.indexOf(chore) !== idToRemove);
        this.props.updateChores(newChores);
    };

    renderUsers = (users) => {
        let usersToRender = users.map(user =>
                <li
                   key={user.id}
                   id={user.id} 
                   className='manageuser'
                >
                    <p 
                        className='manageusername'
                    >
                        {user.username}
                    </p>
                    <button
                        className='manageuserbutton'
                        id={user.id}
                        onClick={this.removeUser}
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

    renderChores = (chores) => {
        let choresToRender = chores.map(chore =>
            <li
                key={chores.indexOf(chore)}
                id={chores.indexOf(chore)}
                className='managechore'
            >
                <p 
                    className='managechorename'
                >
                    {chore}    
                </p>
                <button
                    id={chores.indexOf(chore)}
                    value={chore}
                    className='managechorebutton'
                    onClick={this.removeChore}
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
    
    render() {
        return(
            <div 
                className='manage'
            >
                <h2>
                   {this.props.currentHousehold}
                </h2>
                <h3
                    className='householdid'
                >
                    #1234
                </h3>
                <div 
                    className='manageusers'
                >
                    <span>
                        Users
                    </span>
                    {this.renderUsers(this.props.users)}
                </div>
                <div 
                    className='managechores'
                >
                    <span>
                        Chores
                    </span>
                    {this.renderChores(this.props.chores)}
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
                        <p>
                            You are about to remove yourself from this household.  Is this what you mean to do?
                        </p>
                        <button
                            className='manageconfirm'
                            onClick={this.removeSelf}
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