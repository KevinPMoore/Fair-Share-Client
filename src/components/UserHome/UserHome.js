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

    addHousehold = (ev) => {
        ev.preventDefault();
        this.props.addHousehold(this.state.householdName);
    };

    renderHouseholds = (households) => {
        let householdList = households.map(house =>
            <li
                id={households.indexOf(house)}
                className='householdlink'
                key={households.indexOf(house)}
            >
                <Link
                    to='/household'
                    className='householdlink'
                    onClick={() => this.props.updateCurrentHousehold(house)}
                >
                  {house}  
                </Link>
            </li>
        );
        return(
            <ul className='householdlist'>
                {householdList}
            </ul>
        )
    }


    render() {
        return(
            <div className='userhome'>
                <h2>
                    {this.props.userName || 'TestGuy'}
                </h2>
                {this.renderHouseholds(this.props.households)}
                <button
                    className='joinhouseholdbutton'
                    onClick={this.updatedJoin}
                >
                    Join Household
                </button>
                <div className={this.state.join}>
                    <form
                        className='joinhouseholdform'
                        onSubmit={this.addHousehold}
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
                <button
                    className='createhouseholdbutton'
                    onClick={this.updatedCreate}
                >
                    Create Household
                </button>
                <div className={this.state.create}>
                    <form
                        className='createhouseholdform'
                        onSubmit={this.addHousehold}
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