import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Landing from './components/Landing/Landing';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import './App.css';

export default class App extends React.Component {
  state = {
    loggedIn: true,
    userId: 0
  };

  updatedLoggedIn = () => {
    this.setState({
      loggedIn: !this.state.loggedIn
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
            updatedLoggedIn={this.updatedLoggedIn}
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
              component={Login}
            />

            <Route
              exact
              path={'/register'}
              component={Register}
            />
          </Switch>
       </main>
     </div>
    )
  };
};