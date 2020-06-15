import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Landing from './components/Landing/Landing';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Demo from './components/Demo/Demo';
import UserHome from './components/UserHome/UserHome';
import Household from './components/Household/Household';
import Manage from './components/Manage/Manage';
import AddChore from './components/AddChore/AddChore';
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

            <Route
              exact
              path={'/demo'}
              render={(props) => <Demo {...props}/>}
            />

            <Route
              exact
              path={'/userhome'}
              render={(props) => <UserHome {...props}/>}
            />

            <Route
              exact
              path={'/household'}
              render={(props) => <Household {...props}/>}
            />

            <Route
              exact
              path={'/manage'}
              render={(props) => <Manage {...props}/>}
            />
            
            <Route
              exact
              path={'/addchore'}
              render={(props) => <AddChore {...props}/>}
            />
            
          </Switch>
       </main>
     </div>
    )
  };
};