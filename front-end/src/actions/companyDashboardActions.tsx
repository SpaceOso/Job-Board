import axios from 'axios';
import { setAuth } from '../utils/utils';
import {setCompanyAndEmployee, setSiteIdle, siteFetch} from './authActions';
import {COMPANY_FETCHING, COMPANY_IDLE, EDITING_JOB_POST_SUCCESS, ROOT_URL} from './index';
import * as moment from "moment";
import _date = moment.unitOfTime._date;
import {company} from "aws-sdk/clients/importexport";

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

export function getThisCompanyJobsSuccess(data) {
  return {
    type: GET_THIS_COMPANY_JOBS_SUCCESS,
    payload: data,
  };
}

export function editingJobPost() {
  return {
    type: EDITING_JOB_POST,
    payload: 'editing jobPost post',
  };
}

export function fetchAllCompanyJobModels(companyId) {
  console.log("fetchAllCompanyJobModels: ", companyId);
  return (dispatch) => {
    dispatch(siteFetch());
    dispatch(companyFetching());

    axios.get(`${ROOT_URL}secured/company/${companyId}/get-jobs-and-applicants`)
      .then((data) => {
        console.log("the response that we get from get-jobs:", data);
        dispatch(getThisCompanyJobsSuccess(data));
        dispatch(companyIdle());
      })
      .catch(error =>{
        console.log("there was error in get-jobs", error);
      })
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
export function saveJobPost(jobPostInfo) {
  return (dispatch) => {

    console.log("trying to post a new job ", jobPostInfo);

    dispatch(companyFetching());

    axios.post(`${ROOT_URL}secured/company/jobposts/create`, jobPostInfo)
      .then((response) => {
        console.log("the resposne that we get", response);
        if(response.data.job === null || response.data.job === undefined){
          throw new Error("Sorry couldn't not create your new job. Please make sure you have an internet connection");
        }
        dispatch(editingJobPostSuccess(response.data));
        dispatch(setSiteIdle());
      })
      .catch((error) => {
        console.log("error creating a new job ", error);
        // TODO need to add an error handlers
        dispatch(setSiteIdle());
      });
  };

}

function createFormData(object: Object, form?: FormData, namespace?: string): FormData {
  const formData = form || new FormData();
  for (let property in object) {
    if (!object.hasOwnProperty(property) || !object[property]) {
      continue;
    }
    const formKey = namespace ? `${namespace}[${property}]` : property;
    if (object[property] instanceof Date) {
      formData.append(formKey, object[property].toISOString());
    } else if (typeof object[property] === 'object' && !(object[property] instanceof File)) {
      createFormData(object[property], formData, formKey);
    } else {
      formData.append(formKey, object[property]);
    }
  }
  return formData;
}

/**
 *
 * @param companyInfo {object}                   - The company information created after registration of a new employee
 * @param file {File | null}   - The company logo
 * @property companyInfo.employeeId {string}         - The current employee id who is trying to register a new company
 * @return {(dispatch) => any}
 */
export function submitCompanyRegistration(companyInfo) {

  console.log("companyInfo before formdata", companyInfo);
  const companyWrapper = {
    company: {...companyInfo.company},
    employeeId: companyInfo.employeeId,
    // logoFile: companyInfo.logoFile !== undefined ? companyInfo.logoFile : null,
  };

  const data = new FormData();
  if (companyInfo.logoFile !== null) {
    data.append('logoFile', companyInfo.logoFile);
  }

  data.append("companyWrapper",
    new Blob([JSON.stringify(companyWrapper)], {type: "application/json"}));

  console.log("the blob:", JSON.stringify(companyWrapper));

  return (dispatch) => {

    dispatch(siteFetch());

    console.log("about to register a new company with:", data);

    axios.post(`${ROOT_URL}secured/company/create`, data)
      .then((response) => {

        console.log('response from the server:', response);
        /*recieving {token, company}*/
        setAuth(response.data.token);
        response.data.employee.companyIdentifier = response.data.companyId;

        dispatch( setCompanyAndEmployee(response.data.company, response.data.companyId));
      })
      .catch(error => console.log("we got an error", error));
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
