import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

// components
import { RouteComponentProps } from 'react-router';
import { Applicants, Employer, User } from '../../../types';
import ApplicantListComponent from '../applicant-list/ApplicantListComponent';
import ApplicantViewContainer from '../applicant-view/ApplicantViewContainer';
import CreateJobComponent from '../jobs/createJob/CreateJobComponent';
import EditJobsLayout from '../jobs/editJob/EditJobsLayout';
import UnderConstruction from '../../under-construction/UnderConstruction';
import UserDashboardHome from '../home/UserDashboardHome';
import UserDashboardNavMenu from '../nav-menu/UserDashboardNavMenu';
// styles
import './styles/MainLyout.scss';

interface Props extends RouteComponentProps<any> {
  user: User;
  employer: Employer;
  saveJobPost: (jobInfo, userId) => {};
}

interface State {
  selectedApplicant: Applicants | null;
  mobile: boolean;
}

class DashboardMainLayout extends React.Component<Props, any> {
  state: State = {
    selectedApplicant: null,
    mobile: false,
  };

  constructor(props) {
    super(props);

    this.handleApplicantSelect = this.handleApplicantSelect.bind(this);
    this.createJobComponent = this.createJobComponent.bind(this);
    this.editJobsLayout = this.editJobsLayout.bind(this);
    this.applicantVewContainer = this.applicantVewContainer.bind(this);
    this.applicantListComponent = this.applicantListComponent.bind(this);
    this.underConstruction = this.underConstruction.bind(this);
  }

  componentDidMount() {
    this.setState({
      mobile: window.innerWidth <= 1046,
    });
  }

  handleApplicantSelect(selectedApplicant) {
    this.setState({ selectedApplicant });
  }

  createJobComponent = () => {
    return (
      <CreateJobComponent
        userId={this.props.user.id}
        employer={this.props.employer}
        submitJobPost={this.props.saveJobPost}
      />
    );
  }

  editJobsLayout = (props) => {
    return (
      <EditJobsLayout
        employer={this.props.employer}
        jobs={this.props.employer.jobs}
        {...props}
      />
    );
  }

  applicantVewContainer = () => {
    return (
      <ApplicantViewContainer
        applicant={this.state.selectedApplicant}
      />
    );
  }

  applicantListComponent = (props) => {
    return (
      <ApplicantListComponent
        {...props}
        handleApplicantSelect={this.handleApplicantSelect}
        user={this.props.user}
        jobs={this.props.employer.jobs}
        employer={this.props.employer}
      />
    );
  }

  userDashboardHome = () => {
    return (
      <UserDashboardHome
        user={this.props.user}
        employer={this.props.employer}
      />
    );
  }

  underConstruction = () => {
    return (
      <UnderConstruction/>
    );
  };

  render() {
    return (
      <div className="dashboard-layout">
        {this.state.mobile ? null : <UserDashboardNavMenu match={this.props.match}/>}
        <div className="dashboard-info-panel">
          <Switch>
            {/*CREATE JOB COMPONENT*/}
            <Route
              path={`${this.props.match.url}/createjob`}
              render={this.createJobComponent}
            />
            {/*EDIT JOB COMPONENT*/}
            <Route
              path={`${this.props.match.path}/editpostings`}
              render={this.underConstruction}
              // render={this.editJobsLayout}
            />
            {/*SINGLE APPLICANT VIEW CONTAINER*/}
            <Route
              path={`${this.props.match.path}/applicants/:applicantId`}
              render={this.applicantVewContainer}
            />
            {/*APPLICANT LIST*/}
            <Route
              path={`${this.props.match.path}/applicants`}
              render={this.applicantListComponent}
            />
            {/*EDIT PROFILE*/}
            <Route
              path={`${this.props.match.path}/profile`}
              render={this.underConstruction}
            />
            {/*DASHBOARD HOME*/}
            <Route
              path={`${this.props.match.path}`}
              render={this.userDashboardHome}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default DashboardMainLayout;
