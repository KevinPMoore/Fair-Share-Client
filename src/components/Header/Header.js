import React from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import './Header.css';

export default class Header extends React.Component {
    state = {
        burger: 'show',
        buttons: 'hide'
    };

    updateBurger = () => {
        if(this.state.burger === 'hide' ) {
            this.setState({ burger: 'show' });
        } else {
            this.setState({ burger: 'hide' });
        }
    };

    updateButtons = () => {
        if(this.state.buttons === 'hide' ) {
            this.setState({ buttons: 'show' });
        } else {
            this.setState({ buttons: 'hide' });
        }
    };

    handleToggleClick = () => {
        this.updateButtons();
        this.updateBurger();
    };

    //Removes the auth token and prompts a rerender of the header
    handleLogoutClick = () => {
        TokenService.clearAuthToken();
        this.props.updateLoggedIn();
    };

    renderLogout() {
        return(
            <div className='loggedin'>
                <Link 
                    className='userhomelink'
                    to='/userhome'
                >
                    <button className='navbutton'>
                        Home
                    </button>
                </Link>
                <Link
                    className='logoutlink'
                    to='/'
                    onClick={this.handleLogoutClick}
                >
                    <button>
                        Logout
                    </button>
                </Link>
            </div>
        );
    };

    //change from props to authtoken haslogin
    renderLogin() {
        return(
            <div className='notloggedin'>
                <Link
                    className='loginlink'
                    to='/login'
                >
                    <button className='navbutton'>
                        Log In
                    </button>
                </Link>
                <Link
                    className='registerlink'
                    to='/register'
                >
                    <button className='navbutton'>
                        Register
                    </button>
                </Link>
            </div>
        );
    };

    render() {
        return(
            <nav className='nav'>
                <div className='home'>
                    <h1>
                        <Link
                            className='homelink'
                            to='/'
                        >
                            Fair Share
                        </Link>
                    </h1>
                </div>
                <div>
                    {TokenService.hasAuthToken() ? this.renderLogout() : this.renderLogin()}
                </div>
            </nav>
        )
    };
};