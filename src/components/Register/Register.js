import React from 'react';
import TokenService from '../../services/token-service';
import AuthService from '../../services/auth-api-service';
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

    handleRegisterSubmit = (ev) => {
        ev.preventDefault();
        this.setState({
            error: null
        });
        const { username, password } = this.state;

        AuthService.postUser({
            username: username,
            password: password
        })
        .then(user => {
            return AuthService.postLogin({
                username: username,
                password: password
            })
        })
        .then(res => {
            TokenService.saveAuthToken(res.authToken)
            return res.user
        })
        .then(user => {
            this.props.setUser(user)
            this.handleRegisterSuccess()
        })
        .catch(res => {
            this.setState({
                error: res.error
            });
        });
    };

    handleRegisterSuccess = () => {
        const { location, history } = this.props;
        const destination = (location.state || {}).from || '/userhome';
        history.push(destination);
    };

    render() {
        const error = this.state.error;
        return(
            <form
                className='registerform'
                onSubmit={this.handleRegisterSubmit}
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