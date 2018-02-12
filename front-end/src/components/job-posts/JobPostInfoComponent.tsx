import * as React from 'react';

// components
import { Job } from '../../types/index';

// import './styles/JobPostContainer.scss';

interface JobPostInfoProps {
  job: Job;
  handleApplicationClick: () => void;
}

class JobPostInfoComponent extends React.Component<JobPostInfoProps> {
  constructor(props) {
    super(props);
  }

  render() {
    // if we don't have a job available yet send out an empty component
    if (this.props.job.id === '') {
      return (
        <div className="job-post"/>
      );
    }

    return (
      <div className="job-post">
        <div className="job-header-container panel-shadow">
          <h1 className="jp-job-header">{this.props.job.title} @ <span className="italic">{this.props.job.Employer.name}</span></h1>
        </div>
        <div className="job-description-container panel-shadow">
          <div
            className="job-description"
            dangerouslySetInnerHTML={{ __html: this.props.job.description }}
          />
          <button className="btn-standard" onClick={this.props.handleApplicationClick}>Apply Now</button>
        </div>
      </div>
    );
  }

}

export default JobPostInfoComponent;
