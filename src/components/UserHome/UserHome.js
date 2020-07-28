import React from 'react';
import { Link } from 'react-router-dom';
import HouseIcon from './houseicon.jpg';
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
                join: 'expand',
                error: null
            })
        } else {
            this.setState({
                join:'collapsed',
                error: null
            })
        };
    };

    updatedCreate = () => {
        if(this.state.create === 'collapsed') {
            this.setState({
                create: 'expand',
                error: null
            })
        } else {
            this.setState({
                create:'collapsed',
                error: null
            })
        };
    };

    //Patches user to reset userhousehold to null
    leaveHousehold = () => {
        UserService.patchUser(this.state.userid, this.state.username, null, this.props.user.userchores);
        this.setState({
            householdname: null,
            userhousehold: null
        });
    };

    //Checks if the name and id entered match a household in the database
    //If yes the user is patched to set its userhousehold = the household's householdid
    //If no an error is displayed
    joinHousehold = (ev) => {
        let nameToJoin = this.state.formname;
        let numberToJoin = this.state.formnumber;
        ev.preventDefault();
        this.updatedJoin();
        HouseholdService.getHouseholdById(numberToJoin)
        .then(res => {
            if(res.householdname === nameToJoin) {
                this.props.setHousehold(res);
                this.setState({
                    householdname: res.householdname,
                    userhousehold: numberToJoin
                });
                UserService.patchUser(this.state.userid, this.state.username, res.householdid, this.props.user.userchores);
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
            formnumber: '',
            error: null
        });
    };

    //Sends a post to the server creating a new household
    //Then patches the user to set its userhousehold = the household's householdid
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
            formname: '',
            error: null
        });
    };

    //Only renders the household if the user has created/joined one already
    renderHousehold = (household) => {
        if(this.state.householdname !== null) {
            return(
                <div
                    className='householdinfo'
                >
                    <Link
                        className='householdlink'
                        to='/household'
                    >
                    <img
                        className='houseicon'
                        src={HouseIcon}
                        alt='an icon depicting a house'
                    >
                    </img> 
                    </Link>
                    <h3
                        className='householdtitle'
                    >
                        {household}
                    </h3>
                </div>
            );
        };
    };

    //Only allows user to join household if they are not already in one
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

    //Only allows user to create household if they are not already in one
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

    //Only allows user to leave household if they are in one
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

    //Sets the initial state on component mount
    componentDidMount() {
        if(this.props.user.userid !== null) {
            UserService.getUserById(this.props.user.userid)
            .then(res => {
                this.props.setUser(res)
            })
            .then(
                this.setState({
                    username: this.props.user.username,
                    userid: this.props.user.userid,
                    userhousehold: this.props.user.userhousehold
                })
            );
        };
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

    //Updates prop values when leaving the component
    componentWillUnmount() {
        let user = {
            username: this.state.username,
            userid: this.state.userid,
            userhousehold: this.state.userhousehold
        };

        let household = {
            householdname: this.state.householdname,
            householdid: this.state.userhousehold
        };

        this.props.setUser(user);
        this.props.setHousehold(household);
    };

    render() {
        const error = this.state.error;
        return(
            <div className='userhome'>
                <h2>
                    {this.props.user.username}
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
                            className='userhomesubmitbutton'
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
                            className='userhomesubmitbutton'
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