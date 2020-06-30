import React from 'react';
import { Link } from 'react-router-dom';
import HouseholdService from '../../services/households-api-service';
import UserService from '../../services/users-api-service';
import './UserHome.css';

export default class UserHome extends React.Component {
    state = {
        formname: '',
        formnumber: null,
        join: 'collapsed',
        create: 'collapsed',
        householdname: null
    };

    updateFormname = (ev) => {
        this.setState({
            formname: ev.target.value
        });
    };

    updateFormnumber = (ev) => {
        this.setState({
            formnumber: parseInt(ev.target.value)
        });
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

    //patch user to set userhousehold to null
    leaveHousehold = () => {

    };

    //rework with api
    joinHousehold = (ev) => {
        ev.preventDefault();
        this.updatedJoin();
        //1) get request to households/${formnumber}
        //1.5) if 404 then set and display an error
        //2) compare res.householdname to this.state.formname
        //3a) if they match, patch request to set user.userhousehold to formnumber
        //3b) if they dont match set and display an error
    };

    createHousehold = (ev) => {
        ev.preventDefault();
        this.updatedCreate();
        HouseholdService.postHousehold(this.state.formname)
            .then(res => {
                this.setState({
                    userhousehold: res.householdid
                });
                UserService.patchUser(this.state.userid, this.state.username, res.householdid, this.props.userchores);
            });
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

    //this button does nothing atm
    renderJoinButton = () => {
        let joinHouseholdButton = <button
                className='joinhouseholdbutton'
                onClick={this.updatedJoin}
            >
                Join Household
            </button>;
            //if(this.state.householdname === null) {
                return joinHouseholdButton;
            //};
    };

    renderCreateButton = () => {
        let createHouseholdButton = <button
            className='createhouseholdbutton'
            onClick={this.updatedCreate}
        >
            Create Household
        </button>;
        if(this.state.householdname === null) {
            return createHouseholdButton;
        };
    };

    //this button does nothing atm
    renderLeaveHouseButton = () => {
        let leaveHouseButton = <button
            className='leavehouseholdbutton'
        >
            Leave Household
        </button>;
        //if(this.state.householdname !==null) {
            return leaveHouseButton;
        //};
    };

    componentDidMount() {
        console.log('user object from props is ', this.props.user)
        this.setState({
            username: this.props.user.username,
            userid: this.props.user.userid,
            userhousehold: this.props.user.userhousehold
        });
        console.log('House object is ', HouseholdService.getHouseholdById(this.props.user.userhousehold))
        if(this.props.user.userhousehold !== null) {
            HouseholdService.getHouseholdById(this.props.user.userhousehold)
            .then(res => {
                this.setState({
                    householdname: res.householdname
                });
            });
        };
    };

    render() {
        return(
            <div className='userhome'>
                <h2>
                    {this.props.user.username || 'TestGuy'}
                </h2>
                {this.renderHousehold(this.state.householdname)}
                {this.renderLeaveHouseButton()}
                {this.renderJoinButton()}
                <div className={this.state.join}>
                    <form
                        className='joinhouseholdform'
                        //currently not working
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
                            onChange={this.updateFormname}
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
                            onChange={this.updateFormnumber}
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
                        //currently not working
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
                            onChange={this.updateFormname}
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