import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { JobPost } from '../../types';
import Fade from '../animations/Fade';
import JobPostCompanyInfoComponent from './company-info/JobPostCompanyInfoComponent';
import JobPostInfoComponent from './JobPostInfoComponent';

// styles
import './styles/JobPostContainer.scss';

import '../animations/animationStyles.scss';
import ApplicationComponent from './application/ApplicationComponent';

interface JobPostProps extends RouteComponentProps<any> {
  getJobById: (arg) => {};
  loadJob: () => {};
  resetCurrentJob: () => {};
  addApplicantToJob: (applicantInfo) => {};
  currentJobPost: JobPost;
}

interface MyState {
  jobInfoLoaded: boolean;
  currentJobPost: JobPost | null;
  isApplying: boolean;
  didApply: boolean;
}

class JobPostLayout extends React.Component<JobPostProps, MyState> {
  state: MyState = {
    jobInfoLoaded: false,
    currentJobPost: null,
    isApplying: false,
    didApply: false,
  };

  constructor(props) {
    super(props);

    this.loadNewJob = this.loadNewJob.bind(this);
    this.handleJobApplicantInfo = this.handleJobApplicantInfo.bind(this);
    this.handleApplication = this.handleApplication.bind(this);
    this.handleApplicationCancel = this.handleApplicationCancel.bind(this);
  }

  shouldComponentUpdate() {
    return true;
  }

  handleApplicationCancel(e: React.SyntheticEvent<HTMLInputElement> ) {
    e.preventDefault();
    this.setState({ isApplying: false });
  }

  // Will fire when apply button is clicked
  handleApplication() {
    this.setState({ isApplying: !this.state.isApplying });
  }

  componentDidMount() {
    this.props.getJobById(this.props.match.params.jobId);
  }

  componentWillReceiveProps() {
    this.setState({
      jobInfoLoaded: true,
      currentJobPost: this.props.currentJobPost,
      isApplying: false,
    });
  }

  componentWillUnmount() {
    this.props.resetCurrentJob();
  }

  loadNewJob(jobId) {
    // this.props.resetCurrentJob();
    this.props.getJobById(jobId);
  }

  handleJobApplicantInfo(data) {
    console.log('in the jobPost post layout about to add applicant:', data);
    this.props.addApplicantToJob(data);
  }

  render() {

    const jobPostInfoComponent = (
      <JobPostInfoComponent
          jobPost={this.props.currentJobPost}
          handleApplicationClick={this.handleApplication}
      />
    );

    const applicationComponent = (
      <ApplicationComponent
        companyId={this.props.currentJobPost.job.companyId}
        jobId={this.props.currentJobPost.job.id}
        jobTitle={this.props.currentJobPost.job.title}
        handleApplicantInfo={this.props.addApplicantToJob}
        cancelApplication={this.handleApplicationCancel}
        viewingApplication={this.state.isApplying}
      />
    );

    return (
      <div className="job-post-container">
        <Fade key={'application-container'} in={this.state.isApplying} unmountOnExit={true} mountOnEnter={true}>
          {applicationComponent}
        </Fade>
        <Fade key={'post-container'} in={!this.props.currentJobPost.isFetching}>
          {jobPostInfoComponent}
        </Fade>
        <JobPostCompanyInfoComponent isFetching={this.props.currentJobPost.isFetching} company={this.props.currentJobPost.company} loadJob={this.loadNewJob} currentJob={this.props.currentJobPost.job.id}/>
      </div>
    );

  }
}

export default JobPostLayout;
