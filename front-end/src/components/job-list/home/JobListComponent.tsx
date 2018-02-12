import * as React from 'react';
import { Job } from '../../../types/index';
import SpinnerComponent from '../../spinners/spinnerComponent';
import { default as JobListItemComponent } from './JobListItemComponent';

export interface Props {
  jobs: Job[];
  returnJobList: () => void;
  getJobs: () => any;
  isFetching: false;
}

class JobListComponent extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.returnJobList = this.returnJobList.bind(this);
  }

  returnJobList() {
    return (
      Object.keys(this.props.jobs).map((job) => {
        const currentJob = this.props.jobs[ job ];
        if (currentJob !== true) {
          return <JobListItemComponent key={currentJob.id + 1} job={currentJob}/>;
        }
      })
    );
  }

  componentDidMount() {
    this.props.getJobs();
  }

  render() {
    return (
      <div className="job-list-container">
        <h1 id="job-post-header">Recent Job Posts</h1>
        {this.props.isFetching ? <SpinnerComponent/> : this.returnJobList()}
      </div>
    );
  }
}

export default JobListComponent;
