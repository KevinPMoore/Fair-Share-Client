  import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TokenService from '../../services/token-service';

//Checks for auth token so users who are not logged in cannot access the Game or Account components
export default function PrivateRoute({ component, ...props }) {
  const Component = component;
  return (
    <Route
      {...props}
      render={componentProps => (
        TokenService.hasAuthToken()
          ? <Component {...componentProps} bank={props.bank} updateBank={props.updateBank} updateLoggedIn={props.updateLoggedIn} user={props.user} userId={props.userId}/>
          : <Redirect
              to={{
                pathname: '/login',
                state: { from: componentProps.location }
              }}
            />
      )}
    />
  );
};