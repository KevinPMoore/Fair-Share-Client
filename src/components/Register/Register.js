import React from 'react';
import TokenService from '../../services/token-service'
import './Register.css';

export default class Register extends React.Component {
    state = {
        error: null,
        username: '',
        password: ''
    };

    updateUsername = (ev) => {
        this.setState({
            username: ev.target.value
        });
    };

    updatePassword = (ev) => {
        this.setState({
            password: ev.target.value
        });
    };

    handleRegisterSuccess = () => {
        const { location, history } = this.props;
        const destination = (location.state || {}).from || '/userhome';
        history.push(destination);
    };

    handleFakeSubmit = (ev) => {
        ev.preventDefault();
        this.props.updateLoggedIn();
        this.props.updateUserName(this.state.username);
        this.handleLoginSuccess();
    };
    //some auth stuff
    render() {
        const error = this.state.error;
        return(
            <form
                className='registerform'
                //some on submit for auth
            >   
                <p className='passwordrules'>
                    To register please enter a username that is at least 9 characters long
                    and a password that includes an uppercase letter, a lowercase
                    letter, a number and a special character.
                </p>
                <div className='alert'>
                    {error && <p className='red'>{error}</p>}
                </div>
                <div className='username'>
                    <label 
                        className='registeruserlabel'
                        htmlFor='registerusername'
                    >
                        Username
                    </label>
                    <input
                        name='username'
                        type='text'
                        id='registerusername'
                        placeholder='ex. CoolGuyJokes87'
                        required
                        onChange={this.updateUsername}
                    >
                    </input>
                </div>
                <div className='password'>
                    <label 
                        className='registerpasswordlabel'
                        htmlFor='registerpassword'
                    >
                        Password
                    </label>
                    <input
                        name='password'
                        type='password'
                        id='registerpassword'
                        placeholder='V3ryS3cr1t!'
                        required
                        onChange={this.updatePassword}
                    >
                    </input>
                </div>
                <button
                    id='registersubmit'
                    type='submit'
                >
                    Register
                </button>
            </form>
        );
    };
};