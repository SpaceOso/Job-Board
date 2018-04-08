import * as React from 'react';

// styles
import './EmployeeDashboardHome.scss';

import { IMG_URL } from '../../../utils/utils';
import { default as SpinnerComponent } from '../../spinners/spinnerComponent';
import JobPostUpdatesComponent from '../jobs/job-post-updates/JobPostUpdatesComponent';

interface MyProps {
    employee;
  company;
}

class EmployeeDashboardHome extends React.Component<MyProps> {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.company.isFeteching === true) {
      return <SpinnerComponent/>;
    }

    return (
      <div className="dashboard-home">
        <h1 className={'header'}>
          Welcome {this.props.employee.firstName} - {this.props.company.name}
        </h1>
        <img className={'home-logo'} src={`${this.props.company.logoImg}`} alt=""/>
        <JobPostUpdatesComponent jobs={this.props.company.jobs}/>
      </div>
    );
  }
}

export default EmployeeDashboardHome;
