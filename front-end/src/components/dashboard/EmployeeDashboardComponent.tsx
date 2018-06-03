import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { Company, SiteFetching, Employee } from '../../types/index';
import NotFoundComponent from '../not-found/NotFoundComponent';
import { default as SpinnerComponent } from '../spinners/spinnerComponent';
import CompRegisterComponent from './compRegister/CompRegisterComponent';
import { default as DashboardMainLayout } from './main-layout/MainLayout';

// redux
interface Props extends RouteComponentProps<any> {
  employee: Employee;
  company: Company;
  siteFetching: SiteFetching;
  fetchCompanyJobs: (companyId) => void;
  saveJobPost: (jobInfo, employeeId) => {};
  submitCompanyRegistration: (employeeData) => {};
}

class EmployeeDashboardComponent extends React.Component<Props, any> {
  constructor(props) {
    super(props);

    this.state = {
      fetching: true,
    };

    this.handleCompanyRegistration = this.handleCompanyRegistration.bind(this);
    this.submitJobPost = this.submitJobPost.bind(this);
    this.compRegisterName = this.compRegisterName.bind(this);
    this.dashboardMainLayout = this.dashboardMainLayout.bind(this);
  }

  componentWillMount() {
    // if (this.props.company.id !== null) {
      console.log("EmployerDashboard: 2", this.props.company);
      this.props.fetchCompanyJobs(this.props.company.id);
    // }
  }

  /**
   *
   * @param companyData {Company} - The company information from CompRegisterComponent
   * @param file {File} - The logo of the company
   */
  handleCompanyRegistration(companyData, file) {
    console.log('handleCompanyRegistration:', companyData, file);
    const employeeData = { ...companyData, employeeId: this.props.employee.id, logoFile: file };
    this.props.submitCompanyRegistration(employeeData);
  }

  /**
   *  This will handle sending the jobPost post information to the back end.
   */
  submitJobPost(jobPost) {
    this.props.saveJobPost(jobPost, this.props.employee.id);
  }

  compRegisterName = (props) => {
    return (
      <CompRegisterComponent
        submitData={this.handleCompanyRegistration}
        employee={this.props.employee}
        {...props}
      />
    );
  };

  dashboardMainLayout = (props) => {
    return (
      <DashboardMainLayout
        company={this.props.company}
        employee={this.props.employee}
        saveJobPost={this.props.saveJobPost}
        {...props}
      />
    );
  };

  render() {

    if (this.props.company.isFetching === true) {
      console.log("state is Fetching");
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

export default EmployeeDashboardComponent;
