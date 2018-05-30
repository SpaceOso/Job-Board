import * as React from 'react';
import Button from '@material-ui/core/Button';

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
        <Button variant="raised" color="primary">
          Tester
        </Button>
      </div>
    );
  }
}

export default EmployeeDashboardHome;
