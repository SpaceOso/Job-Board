import * as React from 'react';
import { Company } from '../../../types';
import { default as Fade } from '../../animations/Fade';
import { default as SpinnerComponent } from '../../spinners/spinnerComponent';
import JobLinkComponent from '../JobLinkComponent';
import { TransitionGroup } from 'react-transition-group';

interface MyProps {
  company: Company;
  handleClick: (jobId) => void;
  currentJob?: string;
  isFetching: boolean;
}

function otherJobsComponent(props: MyProps) {

  function createJobList() {
    const company: Company = props.company;
    if (props.isFetching) {
      // return <SpinnerComponent/>;
      // return null;
    }
    if (company.jobs !== undefined && company.jobs !== null) {
      return company.jobs.map((job) => {
        if (job.id !== props.currentJob) {
          return (
            <JobLinkComponent
              key={`${job.id}`}
              to={`/jobposts/${job.id}`}
              value={job.id}
              onClick={props.handleClick}
            >
              <li>{job.title}</li>
            </JobLinkComponent>
          );
        }
      });
    }
  }

  return (
    <div className="info-container panel-shadow">
      <h1 className="title">{`Other jobs by ${props.company.name}`}</h1>
      <ul className="other-job-ul">
        {createJobList()}
      </ul>
    </div>
  );
}

export default otherJobsComponent;
