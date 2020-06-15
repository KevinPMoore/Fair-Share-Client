import React from 'react';
import { Link } from 'react-router-dom';
import './UserHome.css';

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
                    Username
                </h2>
                <Link
                    to='/household'
                >
                    My Household
                </Link>
                <button>

                </button>
            </div>
        )
    }
}