import * as React from 'react';
import {Applicants, Company, JobApplicant, SiteFetching, StoreState} from '../../../types/index';
import { default as SpinnerComponent } from '../../spinners/spinnerComponent';
import ApplicantInfoComponent from './applicant-info/ApplicantInfoComponent';

import { connect } from 'react-redux';
import { saveApplicantStatus } from '../../../actions/companyDashboardActions';
import './ApplicantViewContainer.scss';

interface MyProps {
  jobApplicant: JobApplicant | null;
  company: Company;
  siteFetching: SiteFetching;
  updateApplicantInfo: (applicantInfo) => {};
}

const applicantViewContainer: React.SFC<MyProps> = (props) => {
  return (
    <div className={'applicant-view-container'}>
      {props.jobApplicant !== null ? <ApplicantInfoComponent saveApplicantInfo={props.updateApplicantInfo} jobApplicant={props.jobApplicant}/> : <SpinnerComponent/>}
    </div>
  );
};

function mapStateToProps({ company, siteFetching }: StoreState) {
  return {
    company,
    siteFetching,
  };
}

const mapDispatchToProps = dispatch => ({
  updateApplicantInfo: (applicantInfo) => {
    dispatch(saveApplicantStatus(applicantInfo));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(applicantViewContainer);
