declare let process: {
    env: {
        NODE_ENV: string;
    };
};

// TODO need to move these declerations from this file to either the types file or utils
let URL_Test = 'http://spring-cli-enabled-dev.us-east-1.elasticbeanstalk.com/';

if (process.env.NODE_ENV === 'development') {
    URL_Test = 'http://localhost:5000/';
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
export const REGISTER_EMPLOYEE = 'REGISTER_EMPLOYEE';
export type REGISTER_EMPLOYEE = typeof REGISTER_EMPLOYEE;

export const FETCHING_EMPLOYEE = 'FETCHING_EMPLOYEE';
export type FETCHING_EMPLOYEE = typeof FETCHING_EMPLOYEE;

export const FETCHING_THIS_EMPLOYEE_ERROR = 'FETCHING_THIS_EMPLOYEE_ERROR';
export type FETCHING_THIS_EMPLOYEE_ERROR = typeof FETCHING_THIS_EMPLOYEE_ERROR;

export const REGISTER_EMPLOYEE_ERROR = 'REGISTER_EMPLOYEE_ERROR';
export type REGISTER_EMPLOYEE_ERROR = typeof REGISTER_EMPLOYEE_ERROR;

export const REGISTER_EMPLOYEE_SUCCESS = 'REGISTER_EMPLOYEE_SUCCESS';
export type REGISTER_EMPLOYEE_SUCCESS = typeof REGISTER_EMPLOYEE_SUCCESS;

export const LOGIN_EMPLOYEE_SUCCESS = 'LOGIN_EMPLOYEE_SUCCESS';
export type LOGIN_EMPLOYEE_SUCCESS = typeof LOGIN_EMPLOYEE_SUCCESS;

export const LOGIN_EMPLOYEE_ERROR = 'LOGIN_EMPLOYEE_ERROR';
export type LOGIN_EMPLOYEE_ERROR = typeof LOGIN_EMPLOYEE_ERROR;

export const SET_EMPLOYEE = 'SET_EMPLOYEE';
export type SET_EMPLOYEE = typeof SET_EMPLOYEE;

export const SET_COMPANY= 'SET_COMPANY';
export type SET_COMPANY = typeof SET_COMPANY;

export const LOG_OUT_EMPLOYEE = 'LOG_OUT_EMPLOYEE';
export type LOG_OUT_EMPLOYEE = typeof LOG_OUT_EMPLOYEE;

// =====================================
// 	COMPANY DASHBOARD ACTIONS
// =====================================
export const GET_ALL_JOBS = "GET_ALL_JOBS";

export const GET_JOB_BY_ID = "GET_JOB_BY_ID";

export const GET_THIS_COMPANY_JOBS_SUCCESS = "GET_THIS_COMPANY_JOBS_SUCCESS";

export const FETCHING_THIS_COMPANY_JOBS = "FETCHING_THIS_COMPANY_JOBS";

export const REGISTER_COMPANY_SUCCESS = "REGISTER_COMPANY_SUCCESS";

export const EDITING_JOB_POST = "EDITING_JOB_POST";

export const EDITING_JOB_POST_SUCCESS = "EDITING_JOB_POST_SUCCESS";

export const COMPANY_FETCHING = "COMPANY_FETCHING";

export const COMPANY_IDLE = "COMPANY_IDLE";
