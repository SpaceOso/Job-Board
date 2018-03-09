import * as moment from 'moment';
import * as React from 'react';
import { Link } from 'react-router-dom';

// styles
import './JobListItem.scss';

// interfaces
import { JobPost} from '../../../types';
import { IMG_URL } from '../../../utils/utils';

export interface Props {
  jobPost: JobPost;
}

const jobListItemComponent: React.SFC<Props> = (props) => {
  const { jobPost } = props;
  return (
    // LOGO
    <div className="job-list-item panel-shadow">
      <Link className="link-container" to={`jobposts/${jobPost.job.id}`}>
        {/*LOGO*/}
        <div className="job-list-logo">
          <img
            src={jobPost.employer.logoImg ? `${IMG_URL}${jobPost.employer.logoImg}` : require('../../../../images/icon/no-icon.svg')}
          />
        </div>
        {/*JOB INFORMATION*/}
        <div className="job-info">
          <h1 className="job-title">
            {jobPost.job.title}
          </h1>
          <p className="job-employer">
            {jobPost.employer.name}
          </p>
        </div>
        <div className="post-info">
            {/*TODO create a helper function for dates*/}
          <p className="post-date">{moment(new Date(jobPost.job.createdDate.year, jobPost.job.createdDate.monthValue - 1, jobPost.job.createdDate.dayOfMonth, jobPost.job.createdDate.hour, jobPost.job.createdDate.minute)).fromNow()}</p>
          <p className="post-location">{`${jobPost.employer.address.city}, ${jobPost.employer.address.state}`}</p>
        </div>
      </Link>
    </div>
  );
};

export default jobListItemComponent;
