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
import PublicOnlyRoute from './Utils/PublicRoute';
import PrivateOnlyRoute from './Utils/PrivateRoute';
import './App.css';

export default class App extends React.Component {
  state = {
    loggedIn: false,
    user: null
  };

  updateLoggedIn = () => {
    this.setState({
      loggedIn: !this.state.loggedIn
    });
  };

  setUser = (user) => {
    this.setState({
      user: user
    });
  };

  //needs 404 route
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

            <PublicOnlyRoute
              path={'/login'}
              component={Login}
              setUser={this.setUser}
            />

            <PublicOnlyRoute
              path={'/register'}
              component={Register}
              setUser={this.setUser}
            />

            <PublicOnlyRoute
              path={'/demo'}
              component={Demo}
            />

            <PrivateOnlyRoute
              path={'/userhome'}
              component={UserHome}
              user={this.state.user}
            />

            <Route
              exact
              path={'/household'}
              render={(props) => <Household {...props} /*needs new props*//>}
            />

            <Route
              exact
              path={'/manage'}
              render={(props) => <Manage {...props} /*needs new props*//>}
            />
            
            <Route
              exact
              path={'/addchore'}
              render={(props) => <AddChore {...props} /*needs new props*//>}
            />

          </Switch>
       </main>
     </div>
    )
  };
};