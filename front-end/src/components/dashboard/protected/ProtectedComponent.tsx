import * as React from 'react';
import { Redirect, Route } from 'react-router';

function ProtectedComponent({ component: Component, isAuth, employee, ...rest }) {

  return (
    <Route
      {...rest}
      render={(props) => isAuth === true && employee.id === rest.computedMatch.params.employeeId ? <Component {...props} /> : <Redirect to={{ pathname: '/' }}/>}
    />
  );

}

export default ProtectedComponent;
