declare let process: {
  env: {
    NODE_ENV: string;
  };
};

let URL_Test = 'https://mr-job-board.herokuapp.com/';

if (process.env.NODE_ENV === 'development') {
  URL_Test = 'http://localhost:4200/';
}

export const ROOT_URL = URL_Test;
// =====================================
// 	SITE ACTIONS
// =====================================
export const SITE_IS_FETCHING = 'SITE_IS_FETCHING';
export type SITE_IS_FETCHING = typeof SITE_IS_FETCHING;

export const SITE_IDLE = 'SITE_IDLE';
export type SITE_IDLE = typeof SITE_IDLE;

export const ADD_LOGIN_ERROR = 'ADD_LOGIN_ERROR';
export type ADD_LOGIN_ERROR = typeof ADD_LOGIN_ERROR;

export const REMOVE_LOGIN_ERROR = 'REMOVE_LOGIN_ERROR';
export type REMOVE_LOGIN_ERROR = typeof REMOVE_LOGIN_ERROR;

export const CLEAR_ALL_ERRORS = 'CLEAR_ALL_ERRORS';
export type CLEAR_ALL_ERRORS = typeof CLEAR_ALL_ERRORS;
// =====================================
// 	JOB ACTIONS
// =====================================

export const GET_JOBS_SUCCESS = 'GET_JOBS_SUCCESS';
export type GET_JOBS_SUCCESS = typeof GET_JOBS_SUCCESS;

export const GET_JOBS_ERROR = 'GET_JOBS_ERROR';
export type GET_JOBS_ERROR = typeof GET_JOBS_ERROR;

export const FETCHING_JOBS = 'FETCHING_JOBS';
export type FETCHING_JOBS = typeof FETCHING_JOBS;

export const RESET_CURRENT_JOB = 'RESET_CURRENT_JOB';
export type RESET_CURRENT_JOB = typeof RESET_CURRENT_JOB;

export const SINGLE_JOB_SUCCESS = 'SINGLE_JOB_SUCCESS';
export type SINGLE_JOB_SUCCESS = typeof SINGLE_JOB_SUCCESS;

// =====================================
// 	AUTH ACTIONS
// =====================================
export const REGISTER_USER = 'REGISTER_USER';
export type REGISTER_USER = typeof REGISTER_USER;

export const FETCHING_USER = 'FETCHING_USER';
export type FETCHING_USER = typeof FETCHING_USER;

export const FETCHING_THIS_USER_ERROR = 'FETCHING_THIS_USER_ERROR';
export type FETCHING_THIS_USER_ERROR = typeof FETCHING_THIS_USER_ERROR;

export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';
export type REGISTER_USER_ERROR = typeof REGISTER_USER_ERROR;

export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export type REGISTER_USER_SUCCESS = typeof REGISTER_USER_SUCCESS;

export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export type LOGIN_USER_SUCCESS = typeof LOGIN_USER_SUCCESS;

export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';
export type LOGIN_USER_ERROR = typeof LOGIN_USER_ERROR;

export const SET_USER = 'SET_USER';
export type SET_USER = typeof SET_USER;

export const SET_EMPLOYER = 'SET_EMPLOYER';
export type SET_EMPLOYER = typeof SET_EMPLOYER;

export const LOG_OUT_USER = 'LOG_OUT_USER';
export type LOG_OUT_USER = typeof LOG_OUT_USER;

// =====================================
// 	EMPLOYER DASHBOARD ACTIONS
// =====================================
export const GET_ALL_JOBS = "GET_ALL_JOBS";
// export type GET_ALL_JOBS = typeof GET_ALL_JOBS;

export const GET_JOB_BY_ID = "GET_JOB_BY_ID";
// export type GET_JOB_BY_ID = typeof GET_JOB_BY_ID;

export const GET_THIS_EMPLOYER_JOBS_SUCCESS = "GET_THIS_EMPLOYER_JOBS_SUCCESS";
// export type GET_THIS_EMPLOYER_JOBS_SUCCESS = typeof GET_THIS_EMPLOYER_JOBS_SUCCESS;

export const FETCHING_THIS_EMPLOYER_JOBS = "FETCHING_THIS_EMPLOYER_JOBS";
// export type FETCHING_THIS_EMPLOYER_JOBS = typeof FETCHING_THIS_EMPLOYER_JOBS;

export const REGISTER_EMPLOYER_SUCCESS = "REGISTER_EMPLOYER_SUCCESS";
// export type REGISTER_EMPLOYER_SUCCESS = typeof REGISTER_EMPLOYER_SUCCESS;

export const EDITING_JOB_POST = "EDITING_JOB_POST";
// export type EDITING_JOB_POST = typeof EDITING_JOB_POST;

export const EDITING_JOB_POST_SUCCESS = "EDITING_JOB_POST_SUCCESS";
// export type EDITING_JOB_POST_SUCCESS = typeof EDITING_JOB_POST_SUCCESS;

export const EMPLOYER_FETCHING = "EMPLOYER_FETCHING";
// export type EMPLOYER_FETCHING = typeof EMPLOYER_FETCHING;

export const EMPLOYER_IDLE = "EMPLOYER_IDLE";
// export type EMPLOYER_IDLE = typeof EMPLOYER_IDLE;
