import React from 'react';
import TokenService from '../../services/token-service';
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

    //some auth stuff

    handleFakeSubmit = (ev) => {
        ev.preventDefault();
        this.props.updateLoggedIn();
        this.props.updateUserName(this.state.username);
        this.handleLoginSuccess();
    };

    render() {
        const error = this.state.error;
        return(
            <form
                className='registerform'
                //some on submit for auth
                onSubmit={this.handleFakeSubmit}
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
