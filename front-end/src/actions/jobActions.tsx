import axios from 'axios';

import { Job } from '../types';
import { ROOT_URL } from './index';

export const GET_JOBS_SUCCESS = 'GET_JOBS_SUCCESS';
export const GET_JOBS_ERROR = 'GET_JOBS_ERROR';
export const FETCHING_JOBS = 'FETCHING_JOBS';
export const DONE_FETCHING = 'DONE_FETCHING';
export const SET_CURRENT_JOB = 'SET_CURRENT_JOB';
export const ADDING_APPLICANT_TO_JOB = 'ADDING_APPLICANT_TO_JOB';
export const RESET_CURRENT_JOB = 'RESET_CURRENT_JOB';
export const SINGLE_JOB_SUCCESS = 'SINGLE_JOB_SUCCESS';

/*These are actions for the main page and job post page. Actions requiring CRUD job operations will be handled in the
* employerDashboardAction file.*/

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

export function singleJobSuccess(data: Job) {
  return {
    type: SINGLE_JOB_SUCCESS,
    payload: data,
  };
}

export function setCurrentJob(data: Job) {
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

    axios.get(`${ROOT_URL}api/jobposts`)
      .then((response) => {
        dispatch(getJobsSuccess(response));
      })
      .catch((error) => {
        // TODO need to handle error
      });
  };
}

export function addApplicantToJob(applicantInfo) {

  const data = new FormData();

  for (const entries in applicantInfo) {
    if (applicantInfo.hasOwnProperty(entries)) {
      data.set(entries, applicantInfo[ entries ]);
    }
  }

  return (dispatch) => {
    dispatch(fetchingJobs());
    axios.post(`${ROOT_URL}api/createapplicant`, data)
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

    axios.get(`${ROOT_URL}${'api/jobposts/'}${id}`)
      .then((response) => {
        dispatch(singleJobSuccess(response.data));
      })
      .catch((error) => {
        // TODO need to display error here
      });
  };
};
