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


function mapStateToProps({ employee, company, siteFetching }: StoreState) {
  return {
    employee,
    company,
    siteFetching,
  };
}

const mapDispatchToProps = dispatch => ({
  saveJobPost: (jobInfo) => {
    dispatch(saveJobPost(jobInfo));
  },
  fetchCompanyJobs: (companyId) => {
    dispatch(fetchAllCompanyJobModels(companyId));
  },
  submitCompanyRegistration: (companyData) => {
    dispatch(submitCompanyRegistration(companyData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDashboardComponent);
