import * as React from 'react';
import { Redirect, Route } from 'react-router';

function ProtectedComponent({ component: Component, isAuth, user, ...rest }) {

  return (
    <Route
      {...rest}
      render={(props) => isAuth === true && user.id === rest.computedMatch.params.userId ? <Component {...props} /> : <Redirect to={{ pathname: '/' }}/>}
    />
  );

}

export default ProtectedComponent;
