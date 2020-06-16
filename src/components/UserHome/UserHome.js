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
        join: 'collapsed',
        create: 'collapsed'
    }

    updatedJoin = () => {
        if(this.state.join === 'collapsed') {
            this.setState({
                join: 'expand'
            })
        } else {
            this.setState({
                join:'collapsed'
            })
        }
    }

    updatedCreate = () => {
        if(this.state.create === 'collapsed') {
            this.setState({
                create: 'expand'
            })
        } else {
            this.setState({
                create:'collapsed'
            })
        }
    }


    render() {
        return(
            <div className='userhome'>
                <h2>
                    {this.props.userName || 'TestGuy'}
                </h2>
                <Link
                    to='/household'
                    className='householdlink'
                >
                    My Household
                </Link>
                <button
                    className='joinhouseholdbutton'
                    onClick={this.updatedJoin}
                >
                    Join Household
                </button>
                <div className={this.state.join}>
                    <form
                        className='joinhouseholdform'
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