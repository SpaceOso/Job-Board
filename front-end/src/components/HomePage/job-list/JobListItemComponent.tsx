import * as moment from 'moment';
import * as React from 'react';
import { Link } from 'react-router-dom';

// styles
import './JobListItem.scss';

// interfaces
import { Job } from '../../../types/index';
import { IMG_URL } from '../../../utils/utils';

export interface Props {
  job: Job;
}

const jobListItemComponent: React.SFC<Props> = (props) => {
  const { job } = props;
  return (
    // LOGO
    <div className="job-list-item panel-shadow">
      <Link className="link-container" to={`jobposts/${job.id}`}>
        {/*LOGO*/}
        <div className="job-list-logo">
          <img
            src={job.employer.logoImg ? `${IMG_URL}${job.employer.logoImg}` : require('../../../../images/icon/no-icon.svg')}
          />
        </div>
        {/*JOB INFORMATION*/}
        <div className="job-info">
          <h1 className="job-title">
            {job.title}
          </h1>
          <p className="job-employer">
            {job.employer.name}
          </p>
        </div>
        <div className="post-info">
          <p className="post-date">{moment(new Date(job.createdAt)).fromNow()}</p>
          <p className="post-location">{`${job.employer.address.city}, ${job.employer.address.state}`}</p>
        </div>
      </Link>
    </div>
  );
};

export default jobListItemComponent;
