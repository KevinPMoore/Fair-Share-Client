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
import NotFound from './components/NotFound/NotFound';
import './App.css';

export default class App extends React.Component {
  state = {
    loggedIn: false,
    user: null,
    household: null
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

  setHousehold = (household) => {
    this.setState({
      household: household
    });
  };

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
              setHousehold={this.setHousehold}
            />

            <PrivateOnlyRoute
              path={'/household'}
              component={Household}
              user={this.state.user}
              household={this.state.household}
            />

            <PrivateOnlyRoute
              path={'/manage'}
              component={Manage}
              user={this.state.user}
              household={this.state.household}
              setHousehold={this.setHousehold}
            />
            
            <PrivateOnlyRoute
              path={'/addchore'}
              component={AddChore}
              user={this.state.user}
              household={this.state.household}
            />

            <Route
              component={NotFound}
            />

          </Switch>
       </main>
     </div>
    )
  };
};