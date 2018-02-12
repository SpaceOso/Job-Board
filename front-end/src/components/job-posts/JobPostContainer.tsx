import * as React from 'react';
import { connect } from 'react-redux';
import { addApplicantToJob, getJobById, resetCurrentJob } from '../../actions/jobActions';
import { StoreState } from '../../types/index';
// components
import JobPostLayout from './JobPostLayout';
// styles
import './styles/JobPostContainer.scss';

function mapStateToProps({ currentJobPost }: StoreState) {
  return {
    currentJobPost,
  };
}

const mapDispatchToProps = dispatch => ({
  getJobById: (jobId) => {
    dispatch(getJobById(jobId));
  },
  resetCurrentJob: () => {
    dispatch(resetCurrentJob());
  },
  addApplicantToJob: (applicantInfo) => {
    dispatch(addApplicantToJob(applicantInfo));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(JobPostLayout);
