import React from 'react';
import TokenService from '../../services/token-service';
import AuthService from '../../services/auth-api-service';
import './Login.css';

export default class Login extends React.Component {
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

    handleLoginSuccess = () => {
        const { location, history } = this.props;
        const destination = (location.state || {}).from || '/userhome';
        history.push(destination);
    };

    handleSubmitJTWAuth = (ev) => {
        ev.preventDefault();
        this.setState({
            error: null
        });
        const { username, password } = this.state;

        AuthService.postLogin({
            username: username,
            password: password
        })
        .then(res => {
            TokenService.saveAuthToken(res.authToken)
            return res.user
        })
        .then(user => {
            this.props.setUser(user)
            this.handleLoginSuccess()
        })
        .catch(res => {
            this.setState({
                error: res.error
            })
        });
    };

    render() {
        const error = this.state.error;
        return(
            <form
                className='registerform'
                onSubmit={this.handleSubmitJTWAuth}
            >
                <div className='alert'>
                    {error && <p className='red'>{error}</p>}
                </div>
                <div className='username'>
                    <label
                        className='loginuserlabel'
                        htmlFor='loginusername'
                    >
                        Username
                    </label>
                    <input
                        name='username'
                        type='text'
                        id='loginusername'
                        placeholder='ex. CoolGuyJokes87'
                        required
                        onChange={this.updateUsername}
                    >
                    </input>
                </div>
                <div
                    className='password'
                >
                    <label
                        className='loginpasswordlabel'
                        htmlFor='loginpassword'
                    >
                        Password
                    </label>
                    <input
                        name='password'
                        type='password'
                        id='loginpassword'
                        placeholder='V3ryS3cr1t!'
                        required
                        onChange={this.updatePassword}
                    >
                    </input>
                </div>
                <button
                    id='loginsubmit'
                    type='submit'
                >
                    Submit
                </button>
            </form>
        );
    };
};