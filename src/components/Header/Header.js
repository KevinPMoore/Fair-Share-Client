import React from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import HamburgerMenu from './Hamburger_icon.png';
import XIcon from './X_icon.png';
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

    //Used with a ternary in the render method to determine if login/register or home/logout buttons should be rendered based on AuthToken
    renderLogout() {
        return(
            <div className='loggedin'>
                <Link 
                    className='userhomelink'
                    to='/userhome'
                >
                    <button 
                        className='navbutton'
                    >
                        Home
                    </button>
                </Link>
                <Link
                    className='logoutlink'
                    to='/'
                    onClick={this.handleLogoutClick}
                >
                    <button
                        className='navbutton'
                    >
                        Logout
                    </button>
                </Link>
            </div>
        );
    };

    //Used with a ternary in the render method to determine if login/register or home/logout buttons should be rendered based on AuthToken
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

    //Used with a ternary in the render method to determine if h1 should link to Landing or UserHome based on AuthToken
    renderLanding() {
        return(
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
        );
    };

    //Used with a ternary in the render method to determine if h1 should link to Landing or UserHome based on AuthToken
    renderUserHome() {
        return(
            <div className='home'>
                <h1>
                    <Link
                        className='homelink'
                        to='/userhome'
                    >
                        Fair Share
                    </Link>
                </h1>
            </div>
        );
    };

    render() {
        return(
            <nav className='nav'>
                {TokenService.hasAuthToken() ? this.renderUserHome() : this.renderLanding()}
                <div>
                    <img className={[this.state.burger, 'burgericon'].join(' ')} src={HamburgerMenu} alt='a hamburger icon of three horizontle lines' onClick={this.handleToggleClick}></img>
                    <div className={[this.state.buttons, 'buttonscontainer'].join(' ')}>
                        <img className ='xicon' src={XIcon} alt='a green X' onClick={this.handleToggleClick}></img>
                        {TokenService.hasAuthToken() ? this.renderLogout() : this.renderLogin()}  
                    </div>
                </div>
            </nav>
        )
    };
};