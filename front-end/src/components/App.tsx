import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import EmployeeDashboardContainer from './dashboard/EmployeeDashboardContainer';
import JobListContainer from './HomePage/job-list/JobListContainer';
import JobPostContainer from './job-posts/JobPostContainer';
import LayoutComponent from './LayoutComponent';
import LoginContainer from './log-in/LoginContainer';
import NotFoundComponent from './not-found/NotFoundComponent';
import EmployeeRegisterContainer from './register/EmployeeRegisterContainer';

// actions
import {Company, SiteErrors, SiteFetching, Employee, AuthEmployee} from '../types';
import ProtectedComponent from './dashboard/protected/ProtectedComponent';

interface Props {
  logInOnLoad;
  logOutEmployee: () => {};
  employee: AuthEmployee;
  // company: Company;
  siteFetching: SiteFetching;
  siteErrors: SiteErrors;
}

class App extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.checkReload = this.checkReload.bind(this);

    this.checkReload = this.checkReload.bind(this);
  }

  checkReload() {
    const token = localStorage.getItem('tkn');
    if (token !== null) {
      this.props.logInOnLoad(token);
    }
  }

  componentWillMount() {
    this.checkReload();
  }

  render() {
    return (
      <BrowserRouter>
        <LayoutComponent employee={this.props.employee} logOutEmployee={this.props.logOutEmployee}>
          {/*<Route exact path="/" component={JumboTron}/>*/}
          <Switch>
            <Route exact path="/" component={JobListContainer as any}/>
            <Route exact path="/register" component={EmployeeRegisterContainer as any}/>
            <Route exact path="/jobposts/:jobId" component={JobPostContainer as any}/>
            <Route exact path="/login" component={LoginContainer as any}/>
            <ProtectedComponent
              path="/employee/dashboard/:employeeId"
              component={EmployeeDashboardContainer}
              isAuth={this.props.employee.isAuth}
              employee={this.props.employee}
            />
            <Route component={NotFoundComponent}/>
          </Switch>
        </LayoutComponent>
      </BrowserRouter>
    );
  }
}

export default App;
