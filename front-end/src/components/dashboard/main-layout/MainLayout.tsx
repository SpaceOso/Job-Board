import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

// components
import { RouteComponentProps } from 'react-router';
import {Applicants, Company, Employee, JobApplicant} from '../../../types';
import ApplicantListComponent from '../applicant-list/ApplicantListComponent';
import ApplicantViewContainer from '../applicant-view/ApplicantViewContainer';
import CreateJobComponent from '../jobs/createJob/CreateJobComponent';
import EditJobsLayout from '../jobs/editJob/EditJobsLayout';
import UnderConstruction from '../../under-construction/UnderConstruction';
import EmployeeDashboardHome from '../home/EmployeeDashboardHome';
import EmployeeDashboardNavMenu from '../nav-menu/EmployeeDashboardNavMenu';
// styles
import './styles/MainLyout.scss';

interface Props extends RouteComponentProps<any> {
  employee: Employee;
  company: Company;
  saveJobPost: (jobInfo) => {};
}

interface State {
  selectedApplicant: JobApplicant | null;
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
    console.log("MainLayout: ", selectedApplicant);
    this.setState({ selectedApplicant });
  }

  createJobComponent = () => {
    return (
      <CreateJobComponent
        employeeId={this.props.employee.id}
        company={this.props.company}
        submitJobPost={this.props.saveJobPost}
      />
    );
  };

  editJobsLayout = (props) => {
    return (
      <EditJobsLayout
        company={this.props.company}
        jobs={this.props.company.jobs}
        {...props}
      />
    );
  };

  applicantVewContainer = () => {
    return (
      <ApplicantViewContainer
        jobApplicant={this.state.selectedApplicant}
      />
    );
  };

  applicantListComponent = (props) => {
    return (
      <ApplicantListComponent
        {...props}
        handleApplicantSelect={this.handleApplicantSelect}
        employee={this.props.employee}
        jobs={this.props.company.jobs}
        company={this.props.company}
      />
    );
  };

    employeeDashboardHome = (props) => {
    return (
      <EmployeeDashboardHome
        {...props}
        employee={this.props.employee}
        company={this.props.company}
      />
    );
  };

  underConstruction = () => {
    return (
      <UnderConstruction/>
    );
  };

  render() {
    return (
      <div className="dashboard-layout">
        {this.state.mobile ? null : <EmployeeDashboardNavMenu match={this.props.match}/>}
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
              render={this.employeeDashboardHome}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default DashboardMainLayout;
