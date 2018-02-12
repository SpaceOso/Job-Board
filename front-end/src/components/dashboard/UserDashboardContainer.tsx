import * as React from 'react';
import { connect } from 'react-redux';

// actions
import {
  fetchAllEmployerJobModels, saveJobPost,
  submitEmployerRegistration,
} from '../../actions/employerDashboardActions';

// styles
import './UserDashboardContainer.scss';

// components

import { StoreState } from '../../types/index';
import UserDashboardComponent from './UserDashboardComponent';

/*What data are we going to need?
 * jobs
 * applicants
 * CRUD jobs*/

/*How do we know who is logged in?
 * Should we pull user info on load?
 * or should we check if the user has an employer?
 * I think you should check that THEN do a get request to get employer info
 * if employer property is not inside then show create/submit job buttons*/

/*What components are you going to need for the dashboard?
 * list of the latest applicants
 * possibly list of job posts with info like when it was posted, total applicant count
 * an applicant at a glance component
 * a component to view the applicants resume on click*/

/*need to show a company sign up form before proceeding*/

// function mapStateToProps({user, employer}: StoreState, {...props} ) {
function mapStateToProps({ user, employer, siteFetching }: StoreState) {
  return {
    user,
    employer,
    siteFetching,
  };
}

const mapDispatchToProps = dispatch => ({
  saveJobPost: (jobInfo, userId) => {
    dispatch(saveJobPost(jobInfo, userId));
  },
  fetchEmployerJobs: (employerId) => {
    dispatch(fetchAllEmployerJobModels(employerId));
  },
  submitEmployerRegistration: (employerData, file: File) => {
    dispatch(submitEmployerRegistration(employerData, file));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboardComponent);
