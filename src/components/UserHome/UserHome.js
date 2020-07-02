import React from 'react';
import { Link } from 'react-router-dom';
import HouseholdService from '../../services/households-api-service';
import UserService from '../../services/users-api-service';
import './UserHome.css';

export default class UserHome extends React.Component {
    state = {
        formname: '',
        formnumber: '',
        join: 'collapsed',
        create: 'collapsed',
        householdname: null,
        error: null
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

    leaveHousehold = () => {
        UserService.patchUser(this.state.userid, this.state.username, null, this.props.user.userchores);
        this.setState({
            householdname: null,
            userhousehold: null
        });
    };

    joinHousehold = (ev) => {
        let nameToJoin = this.state.formname;
        let numberToJoin = this.state.formnumber;
        ev.preventDefault();
        this.updatedJoin();
        HouseholdService.getHouseholdById(numberToJoin)
        .then(res => {
            if(res.householdname === nameToJoin) {
                UserService.patchUser(this.state.userid, this.state.username, res.householdid, this.props.user.userchores);
                this.props.setHousehold(res);
                this.setState({
                    householdname: res.householdname
                });
            } else {
                this.setState({
                    error: 'Incorrect Household name or id'
                });
            };
        })
        .catch(res => {
            this.setState({
                error: res.error
            })
        });
        this.setState({
            formname: '',
            formnumber: ''
        });
    };

    createHousehold = (ev) => {
        ev.preventDefault();
        this.updatedCreate();
        HouseholdService.postHousehold(this.state.formname)
            .then(res => {
                this.props.setHousehold(res);
                this.setState({
                    userhousehold: res.householdid,
                    householdname: res.householdname
                });
                UserService.patchUser(this.state.userid, this.state.username, res.householdid, this.props.userchores);
            });
        this.setState({
            formname: ''
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

    renderJoinButton = () => {
        let joinHouseholdButton = <button
                className='joinhouseholdbutton'
                onClick={this.updatedJoin}
            >
                Join Household
            </button>;
            if(this.state.householdname === null) {
                return joinHouseholdButton;
            };
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

    renderLeaveHouseButton = () => {
        let leaveHouseButton = <button
            className='leavehouseholdbutton'
            onClick={this.leaveHousehold}
        >
            Leave Household
        </button>;
        if(this.state.householdname !==null) {
            return leaveHouseButton;
        };
    };

    componentDidMount() {
        this.setState({
            username: this.props.user.username,
            userid: this.props.user.userid,
            userhousehold: this.props.user.userhousehold
        });
        if(this.props.user.userhousehold !== null) {
            HouseholdService.getHouseholdById(this.props.user.userhousehold)
            .then(res => {
                this.props.setHousehold(res);
                this.setState({
                    householdname: res.householdname
                });
            });
        };
    };

    render() {
        const error = this.state.error;
        return(
            <div className='userhome'>
                <h2>
                    {this.props.user.username || 'TestGuy'}
                </h2>
                <div className='alert'>
                    {error && <p className='red'>{error}</p>}
                </div>
                {this.renderHousehold(this.state.householdname)}
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
                            value={this.state.formname}
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
                            value={this.state.formnumber}
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
                            value={this.state.formname}
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