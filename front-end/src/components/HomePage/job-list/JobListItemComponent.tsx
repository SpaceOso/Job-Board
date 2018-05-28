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
  console.log("JOBPOST", jobPost);
  return (
    // LOGO
    <div className="job-list-item panel-shadow">
      <Link className="link-container" to={`jobposts/${jobPost.job.id}`}>
        {/*LOGO*/}
        <div className="job-list-logo">
          <img
            src={jobPost.company.logoImg ? `${jobPost.company.logoImg}` : require('../../../../images/icon/no-icon.svg')}
          />
        </div>
        {/*JOB INFORMATION*/}
        <div className="job-info">
          <h1 className="job-title">
            {jobPost.job.title}
          </h1>
          <p className="job-company">
            {jobPost.company.name}
          </p>
        </div>
        <div className="post-info">
            {/*TODO create a helper function for dates*/}
          <p className="post-date">{moment().from(jobPost.job.createdDate)}</p>
          <p className="post-location">{`${jobPost.company.address.city}, ${jobPost.company.address.state}`}</p>
        </div>
      </Link>
    </div>
  );
};

export default jobListItemComponent;
