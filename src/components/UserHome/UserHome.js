import React from 'react';
import { Link } from 'react-router-dom';
import './UserHome.css';

//this component needs to...
//have forms expand/collapse
//   button need to use setstate
//link to household when clicked
//fake creating a household

export default class UserHome extends React.Component {
    state = {
        householdName: '',
        join: 'collapsed',
        create: 'collapsed'
    };

    updatedJoin = () => {
        if(this.state.join === 'collapsed') {
            this.setState({
                join: 'expand'
            })
        } else {
            this.setState({
                join:'collapsed'
            })
        };
    };

    updatedCreate = () => {
        if(this.state.create === 'collapsed') {
            this.setState({
                create: 'expand'
            })
        } else {
            this.setState({
                create:'collapsed'
            })
        };
    };

    updateHouseholdName = (ev) => {
        this.setState({
            householdName: ev.target.value
        });
    };

    joinHousehold = (ev) => {
        ev.preventDefault();
        this.updatedJoin();
        this.props.addHousehold(this.state.householdName);
    };

    createHousehold = (ev) => {
        ev.preventDefault();
        this.updatedCreate();
        this.props.addHousehold(this.state.householdName);
    };

    renderHousehold = (household) => {
        let householdList = 
            <li
                id={household}
                className='householdlink'
                key={household}
            >
                <Link
                    to='/household'
                    className='householdlink'
                >
                  {household}  
                </Link>
            </li>;
        return(
            <ul className='householdlist'>
                {householdList}
            </ul>
        );
    };

    renderJoinButton = () => {
        let joinHouseholdButton = <button
                className='joinhouseholdbutton'
                onClick={this.updatedJoin}
            >
                Join Household
            </button>;
        if(this.props.households.length === 0) {
            return joinHouseholdButton;
        };
    };

    renderCreateButton = () => {
        let createHouseholdButton = <button
            className='createhouseholdbutton'
            onClick={this.updatedJoin}
        >
            Join Household
        </button>;
        if(this.props.households.length === 0) {
            return createHouseholdButton;
        };
    };

    renderLeaveHouseButton = () => {
        let leaveHouseButton = <button
            className='leavehouseholdbutton'
            onClick={() => this.props.addHousehold([])}
        >
            Leave Household
        </button>;
        if(this.props.households.length !== 0) {
            return leaveHouseButton;
        };
    };

    render() {
        return(
            <div className='userhome'>
                <h2>
                    {this.props.userName || 'TestGuy'}
                </h2>
                {this.renderHousehold(this.props.households)}
                {this.renderLeaveHouseButton()}
                {this.renderJoinButton()}
                <div className={this.state.join}>
                    <form
                        className='joinhouseholdform'
                        onSubmit={this.joinHousehold}
                    >
                        <label
                            className='userhomelabel'
                            htmlFor='joinhouseholdname'
                        >
                            Household name
                        </label>
                        <input
                            type='text'
                            id='joinhouseholdname'
                            placeholder='My House'
                            onChange={this.updateHouseholdName}
                            required
                        >
                        </input>
                        <label
                            className='userhomelabel'
                            htmlFor='joinhouseholdid'
                        >
                            Household id
                        </label>
                        <input
                            type='number'
                            id='joinhouseholdid'
                            required
                        >
                        </input>
                        <button
                            type='submit'
                        >
                            Submit
                        </button>
                    </form>
                </div>
                {this.renderCreateButton()}
                <div className={this.state.create}>
                    <form
                        className='createhouseholdform'
                        onSubmit={this.createHousehold}
                    >
                        <label
                            className='createhouseholdnamelabel'
                            htmlFor='userhomelabel'
                        >
                            Household name
                        </label>
                        <input
                            type='text'
                            id='createhouseholdname'
                            placeholder='My House'
                            required
                            onChange={this.updateHouseholdName}
                        >
                        </input>
                        <button
                            type='submit'
                        >
                            Submit
                        </button>
                    </form> 
                </div>
            </div>
        );
    };
};