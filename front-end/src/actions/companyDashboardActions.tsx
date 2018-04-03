import axios from 'axios';
import { setAuth } from '../utils/utils';
import {setCompanyAndEmployee, setSiteIdle, siteFetch} from './authActions';
import {COMPANY_FETCHING, COMPANY_IDLE, EDITING_JOB_POST_SUCCESS, ROOT_URL} from './index';

export const GET_THIS_COMPANY_JOBS_SUCCESS = 'GET_THIS_COMPANY_JOBS_SUCCESS';
export const FETCHING_THIS_COMPANY_JOBS = 'FETCHING_THIS_COMPANY_JOBS';
export const REGISTER_COMPANY_SUCCESS = 'REGISTER_COMPANY_SUCCESS';
export const EDITING_JOB_POST = 'EDITING_JOB_POST';

/*What are some of the actions you expect the dashboard to require?
 * Get all jobs
 * Get all applicants
 * view jobPost details
 * edit jobPost details
 * delete jobPost
 * view applicants per jobPost
 * view applicant details*/

export function fetchingThisCompanyInfo() {
  return {
    type: FETCHING_THIS_COMPANY_JOBS,
    payload: 'fetching jobs',
  };
}

export function registerCompanySuccess() {
  return {
    type: REGISTER_COMPANY_SUCCESS,
    payload: 'company registered',
  };
}

export function getThisCompanyJobsSuccess(jobs) {
  return {
    type: GET_THIS_COMPANY_JOBS_SUCCESS,
    payload: jobs,
  };
}

export function editingJobPost() {
  return {
    type: EDITING_JOB_POST,
    payload: 'editing jobPost post',
  };
}

export function fetchAllCompanyJobModels(companyId) {
  return (dispatch) => {
    dispatch(siteFetch());
    dispatch(companyFetching());

    axios.get(`${ROOT_URL}company/${companyId}/get-jobs`)
      .then((jobs) => {
        dispatch(getThisCompanyJobsSuccess(jobs));
        dispatch(companyIdle());
      });
  };
}

export function editingJobPostSuccess(jobPost) {
  return {
    type: EDITING_JOB_POST_SUCCESS,
    payload: jobPost,
  };
}

export function companyFetching() {
  return {
    type: COMPANY_FETCHING,
    payload: 'Company Fetching',
  };
}

export function companyIdle() {
  return {
    type: COMPANY_IDLE,
    payload: 'Company Idle',
  };
}

/**
 *
 * @param {Object}jobPostInfo - It's the form values from createJobComponent. It's set in the state.
 * @param employeeId{string}
 * @return {(dispatch) => any}
 */
export function saveJobPost(jobPostInfo, employeeId) {
  return (dispatch) => {

    dispatch(companyFetching());

    axios.post(`${ROOT_URL}company/createJob`, jobPostInfo)
      .then((response) => {
        dispatch(editingJobPostSuccess(response.data));
        dispatch(setSiteIdle());
      })
      .catch((error) => {
        console.log(error);
        // TODO need to add an error handlers
        dispatch(setSiteIdle());
      });
  };

}

/**
 *
 * @param companyInfo {object}                   - The company information created after registration of a new employee
 * @param file {File | null}   - The company logo
 * @property companyInfo.employeeId {string}         - The current employee id who is trying to register a new company
 * @return {(dispatch) => any}
 */
export function submitCompanyRegistration(companyInfo, file: File) {

  const data = new FormData();
  if (file !== null) {
    data.append('file', file);
  }

  for (const entries in companyInfo) {
    if (companyInfo.hasOwnProperty(entries)) {

      if (entries === 'logo') {
        data.append(entries, '');
      } else {
        data.append(entries, companyInfo[ entries ]);
      }

    }
  }

  return (dispatch) => {

    dispatch(siteFetch());

    axios.post(`${ROOT_URL}api/register/company`, data)
      .then((response) => {

        console.log('response from the server:', response);
        /*recieving {token, company}*/
        setAuth(response.data.token);

        dispatch(setCompanyAndEmployee(response.data.company, response.data.employee));
      })
      .catch(error => console.log(error));
  };
}

export function saveApplicantStatus(applicantInfo) {
  return (dispatch) => {
    dispatch(siteFetch());

    axios.post(`${ROOT_URL}company/update/${applicantInfo.id}`, applicantInfo)
      .then((response) => {
        dispatch(setSiteIdle());
      })
      .catch((error) => {
        dispatch(setSiteIdle());
      });
  };
}
