import * as React from 'react';
import Button from '@material-ui/core/Button';

// styles
import './EmployeeDashboardHome.scss';

import { IMG_URL } from '../../../utils/utils';
import { default as SpinnerComponent } from '../../spinners/spinnerComponent';
import JobPostUpdatesComponent from '../jobs/job-post-updates/JobPostUpdatesComponent';
import {Company, Employee} from "../../../types";

interface MyProps {
  employee: Employee;
  company: Company;
}

class EmployeeDashboardHome extends React.Component<MyProps> {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.company.isFetching === true) {
      return <SpinnerComponent/>;
    }

    return (
      <div className="dashboard-home">
        <h2 className='header'>
          Welcome {this.props.employee.firstName} - {this.props.company.name}
        </h2>
        <img className={'home-logo'} src={`${this.props.company.logoImg}`} alt=""/>
        <JobPostUpdatesComponent jobs={this.props.company.jobs} company={this.props.company}/>
      </div>
    );
  }
}

export default EmployeeDashboardHome;
