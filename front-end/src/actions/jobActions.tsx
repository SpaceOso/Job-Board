import axios from 'axios';

import {JobPost} from '../types';
import { ROOT_URL } from './index';

export const GET_JOBS_SUCCESS = 'GET_JOBS_SUCCESS';
export const GET_JOBS_ERROR = 'GET_JOBS_ERROR';
export const FETCHING_JOBS = 'FETCHING_JOBS';
export const DONE_FETCHING = 'DONE_FETCHING';
export const SET_CURRENT_JOB = 'SET_CURRENT_JOB';
export const ADDING_APPLICANT_TO_JOB = 'ADDING_APPLICANT_TO_JOB';
export const RESET_CURRENT_JOB = 'RESET_CURRENT_JOB';
export const SINGLE_JOB_SUCCESS = 'SINGLE_JOB_SUCCESS';

/*These are actions for the main page and jobPost post page. Actions requiring CRUD jobPost operations will be handled in the
* companyDashboardAction file.*/

export function getJobsSuccess(jobs) {
  return {
    type: GET_JOBS_SUCCESS,
    payload: jobs,
  };
}

export function getJobsError(error) {
  return { error, type: GET_JOBS_ERROR };
}

export function fetchingJobs() {
  return {
    type: FETCHING_JOBS,
  };
}

export function doneFetchingJobs() {
  return {
    type: DONE_FETCHING,
  };
}

export function resetCurrentJob() {
  return {
    type: RESET_CURRENT_JOB,
  };
}

export function singleJobSuccess(data: JobPost) {
  return {
    type: SINGLE_JOB_SUCCESS,
    payload: data,
  };
}

export function setCurrentJob(data: JobPost) {
  return {
    type: SET_CURRENT_JOB,
    payload: data,
  };
}

export function addingApplicantToJob(data) {
  return {
    type: ADDING_APPLICANT_TO_JOB,
    payload: data,
  };
}

export function getJobs() {

  return (dispatch) => {

    dispatch(fetchingJobs());

    axios.get(`${ROOT_URL}api/v1/jobposts/list/home-page`)
      .then((response) => {
        console.log(`${ROOT_URL}pi/v1/jobposts/list/home-page`);
        console.log("the jobs from the backend:", response);
        dispatch(getJobsSuccess(response));
      })
      .catch((error) => {
        // TODO need to handle error
      });
  };
}

export function addApplicantToJob(applicantInfo) {

  console.log("The applicant info before we send to server: ", applicantInfo);
  const data = new FormData();
  //TODO need to update this


  const applicantDTO = {
    applicant: {...applicantInfo.applicant},
    jobId: applicantInfo.jobId
  };

  data.append("applicantDTO",
    new Blob([JSON.stringify(applicantDTO)], {type: "application/json"}));

  if (applicantInfo.applicant.coverLetterFile !== null) {
    data.append("coverLetter", applicantInfo.applicant.coverLetterFile);
  }

  if (applicantInfo.applicant.resumeFile !== null) {
    data.append("resume", applicantInfo.applicant.resumeFile);
  }

  console.log("the data when creating new applicant: " + applicantInfo);

  return (dispatch) => {
    dispatch(fetchingJobs());
    axios.post(`${ROOT_URL}api/v1/applicant/create`, data)
      .then((response) => {
        dispatch(doneFetchingJobs());
      })
      .catch((error) => {
        console.log('error from creating applicant...', error);
      });
  };
}

export function getJobById(id) {
  return (dispatch) => {
    dispatch(fetchingJobs());
    console.log("Getting single jobPost: ", id);
      axios.get(`${ROOT_URL}${'api/v1/jobposts/'}${id}`)
      .then((response) => {
          console.log("and the response from jobPost: ", response);
        dispatch(singleJobSuccess(response.data));
      })
      .catch((error) => {
        // TODO need to display error here
      });
  };
};
