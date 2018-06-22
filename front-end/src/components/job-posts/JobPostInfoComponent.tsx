import * as React from 'react';

import Button from '@material-ui/core/Button';

// components
import { JobPost } from '../../types';

// import './styles/JobPostContainer.scss';

interface JobPostInfoProps {
  jobPost: JobPost;
  handleApplicationClick: () => void;
}

class JobPostInfoComponent extends React.Component<JobPostInfoProps> {
  constructor(props) {
    super(props);
  }

  render() {
    // if we don't have a jobPost available yet send out an empty component
    if (this.props.jobPost.job.id === '') {
      return (
        <div className="job-post"/>
      );
    }

    return (
      <div className="job-post">
        <div className="job-header-container panel-shadow">
          <h1 className="jp-job-header">
            {this.props.jobPost.job.title} @
            <span
              className="italic"
            >
              {this.props.jobPost.company.name}
            </span>
          </h1>
        </div>
        <div className="job-description-container panel-shadow">
          <div
            className="job-description"
            dangerouslySetInnerHTML={{ __html: this.props.jobPost.job.description }}
          />
          <Button variant="raised" color="primary" className="btn-standard" onClick={this.props.handleApplicationClick}>Apply
            Now</Button>
        </div>
      </div>
    );
  }

}

export default JobPostInfoComponent;
