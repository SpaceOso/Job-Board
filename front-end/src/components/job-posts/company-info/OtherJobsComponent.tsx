import * as React from 'react';
import { Company } from '../../../types';
import JobLinkComponent from '../JobLinkComponent';

interface MyProps {
  company: Company;
  handleClick: (jobId) => void;
  currentJob?: string;
  isFetching: boolean;
}

function createJobList(props) {
  const company: Company = props.company;

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

function otherJobsComponent(props: MyProps) {

  if(props.company.jobs.length <= 1){
    return null;
  }

  return (
    <div className="info-container panel-shadow">
      <h2 className="title">{`Other jobs by ${props.company.name}`}</h2>
      <ul className="other-job-ul">
        {createJobList(props)}
      </ul>
    </div>
  );
}

export default otherJobsComponent;
