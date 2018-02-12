import * as React from 'react';

// styles
import './UserDashboardHome.scss';

import { IMG_URL } from '../../../utils/utils';
import { default as SpinnerComponent } from '../../spinners/spinnerComponent';
import JobPostUpdatesComponent from '../jobs/job-post-updates/JobPostUpdatesComponent';

interface MyProps {
  user;
  employer;
}

class UserDashboardHome extends React.Component<MyProps> {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.employer.isFeteching === true) {
      return <SpinnerComponent/>;
    }

    return (
      <div className="dashboard-home">
        <h1 className={'header'}>
          Welcome {this.props.user.firstName} - {this.props.employer.name}
        </h1>
        <img className={'home-logo'} src={`${IMG_URL}${this.props.employer.logoImg}`} alt=""/>
        <JobPostUpdatesComponent jobs={this.props.employer.jobs}/>
      </div>
    );
  }
}

export default UserDashboardHome;
