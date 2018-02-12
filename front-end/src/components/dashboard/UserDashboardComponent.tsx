import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { Employer, SiteFetching, User } from '../../types/index';
import NotFoundComponent from '../not-found/NotFoundComponent';
import { default as SpinnerComponent } from '../spinners/spinnerComponent';
import CompRegisterComponent from './compRegister/CompRegisterComponent';
import { default as DashboardMainLayout } from './main-layout/MainLayout';

// redux
interface Props extends RouteComponentProps<any> {
  user: User;
  employer: Employer;
  siteFetching: SiteFetching;
  fetchEmployerJobs: (employerId) => void;
  saveJobPost: (jobInfo, userId) => {};
  submitEmployerRegistration: (userData, file) => {};
}

class UserDashboardComponent extends React.Component<Props, any> {
  constructor(props) {
    super(props);

    this.state = {
      fetching: true,
    };

    this.handleEmployerRegistration = this.handleEmployerRegistration.bind(this);
    this.submitJobPost = this.submitJobPost.bind(this);
    this.compRegisterName = this.compRegisterName.bind(this);
    this.dashboardMainLayout = this.dashboardMainLayout.bind(this);
  }

  componentWillMount() {
    if (this.props.employer.id !== null) {
      this.props.fetchEmployerJobs(this.props.employer.id);
    }
  }

  /**
   *
   * @param employerData {Employer} - The employer information from CompRegisterComponent
   * @param file {File} - The logo of the employer
   */
  handleEmployerRegistration(employerData, file) {
    console.log('handleEmployerRegistration:', employerData, file);
    const userData = { ...employerData, userId: this.props.user.id };
    this.props.submitEmployerRegistration(userData, file);
  }

  /**
   *  This will handle sending the job post information to the back end.
   */
  submitJobPost(jobPost) {
    this.props.saveJobPost(jobPost, this.props.user.id);
  }

  compRegisterName = (props) => {
    return (
      <CompRegisterComponent
        submitData={this.handleEmployerRegistration}
        user={this.props.user}
        {...props}
      />
    );
  }

  dashboardMainLayout = (props) => {
    return (
      <DashboardMainLayout
        employer={this.props.employer}
        user={this.props.user}
        saveJobPost={this.props.saveJobPost}
        {...props}
      />
    );
  }

  render() {

    if (this.state.isFetching === true) {
      if (this.props.employer.isFetching !== true) {
        this.setState({ fetching: false });
      }
      return <SpinnerComponent/>;
    }

    return (
      <div className="dashboard-wrapper">
        <Switch>
          {/*REGISTER COMPONENT*/}
          <Route
            path={`${this.props.match.path}/register`}
            render={this.compRegisterName}
          />
          {/*DASHBOARD MAIN LAYOUT*/}
          <Route
            path={`${this.props.match.path}`}
            render={this.dashboardMainLayout}
          />
          <NotFoundComponent/>
        </Switch>
      </div>
    );
  }
}

export default UserDashboardComponent;
