import * as React from 'react';
import { connect } from 'react-redux';

// actions
import {
  fetchAllCompanyJobModels, saveJobPost,
  submitCompanyRegistration,
} from '../../actions/companyDashboardActions';

// styles
import './EmployeeDashboardContainer.scss';

// components

import { StoreState } from '../../types/index';
import EmployeeDashboardComponent from './EmployeeDashboardComponent';

/*What data are we going to need?
 * jobs
 * applicants
 * CRUD jobs*/

/*How do we know who is logged in?
 * Should we pull employee info on load?
 * or should we check if the employee has an company?
 * I think you should check that THEN do a get request to get company info
 * if company property is not inside then show create/submit jobPost buttons*/

/*What components are you going to need for the dashboard?
 * list of the latest applicants
 * possibly list of jobPost posts with info like when it was posted, total applicant count
 * an applicant at a glance component
 * a component to view the applicants resume on click*/

/*need to show a company sign up form before proceeding*/

// function mapStateToProps({employee, company}: StoreState, {...props} ) {
function mapStateToProps({ employee, company, siteFetching }: StoreState) {
  return {
      employee,
      company,
    siteFetching,
  };
}

const mapDispatchToProps = dispatch => ({
  saveJobPost: (jobInfo, employeeId) => {
    dispatch(saveJobPost(jobInfo, employeeId));
  },
  fetchCompanyJobs: (companyId) => {
    dispatch(fetchAllCompanyJobModels(companyId));
  },
  submitCompanyRegistration: (companyData, file: File) => {
    dispatch(submitCompanyRegistration(companyData, file));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDashboardComponent);
