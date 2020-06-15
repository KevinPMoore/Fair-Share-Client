import React from 'react';
import { Link } from 'react-router-dom';
import './UserHome.css';

//this component needs to...
//have forms expand/collapse
//link to household when clicked
//fake creating a household

export default class UserHome extends React.Component {
    state = {
        join: 'collapsed',
        create: 'collapsed'
    }

    updatedJoin = () => {
        if(this.state.join === 'collapse') {
            this.setState({
                join: 'expand'
            })
        } else {
            this.setState({
                join:'collapse'
            })
        }
    }

    updatedCreate = () => {
        if(this.state.create === 'collapse') {
            this.setState({
                create: 'expand'
            })
        } else {
            this.setState({
                create:'collapse'
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
                >
                    Join Household
                </button>
                <form
                    className={[this.state.join, 'joinhouseholdform'].join(' ')}
                >
                    <label
                        htmlFor='joinhouseholdname'
                    >
                        Household name
                    </label>
                    <input
                        type='text'
                        id='joinhouseholdname'
                        placeholder='My House'
                    >
                    </input>
                    <label
                        htmlFor='joinhouseholdid'
                    >
                        Household id
                    </label>
                    <input
                        type='number'
                        id='joinhouseholdid'
                    >
                    </input>
                </form>
                <button
                    className='createhouseholdbutton'
                >
                    Create Household
                </button>
                <form
                    className={[this.state.join, 'createhouseholdform'].join(' ')}
                >
                    <label
                        htmlFor='createhouseholdname'
                    >
                        Household name
                    </label>
                    <input
                        type='text'
                        id='createhouseholdname'
                        placeholder='My House'
                    >
                    </input>
                </form>
            </div>
        );
    };
};