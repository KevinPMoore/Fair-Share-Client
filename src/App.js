import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Landing from './components/Landing/Landing';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import './App.css';

export default class App extends React.Component {
  state = {
    loggedIn: false,
    userName: '',
    userId: 0
  };

  updateLoggedIn = () => {
    this.setState({
      loggedIn: !this.state.loggedIn
    });
  };

  updateUserName = (name) => {
    this.setState({
      userName: name
    });
  };

  updateUserId = (id) => {
    this.setState({
      userId: id
    });
  };

  //needs login, register, userhome, household, manage and add routes
  //needs private vs public routes
  render() {
    return(
     <div className='app'>
       <header>
          <Header
            loggedIn={this.state.loggedIn}
            updateLoggedIn={this.updateLoggedIn}
          />
       </header>
       <main>
          <Switch>
            <Route
              exact
              path={'/'}
              component={Landing}
            />

            <Route
              exact
              path={'/login'}
              render={(props) => <Login {...props} updateLoggedIn={this.updateLoggedIn} updateUserName={this.updateUserName}/>}
              //fake loging in
            />

            <Route
              exact
              path={'/register'}
              render={(props) => <Register {...props} updateLoggedIn={this.updateLoggedIn} updateUserName={this.updateUserName}/>}
              //fake registering
            />
          </Switch>
       </main>
     </div>
    )
  };
};