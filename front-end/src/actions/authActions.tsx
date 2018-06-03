import axios from 'axios';
import { ADD_LOGIN_ERROR, CLEAR_ALL_ERRORS, REMOVE_LOGIN_ERROR, ROOT_URL, SITE_IDLE, SITE_IS_FETCHING } from './index';

import {Company, Employee, EmployeeWrapper} from '../types';
import { removeAuth, setAuth } from '../utils/utils';
import {fetchAllCompanyJobModels} from "./companyDashboardActions";

export const REGISTER_EMPLOYEE = 'REGISTER_EMPLOYEE';
export const FETCHING_EMPLOYEE = 'FETCHING_EMPLOYEE';
export const FETCHING_THIS_EMPLOYEE_ERROR = 'FETCHING_THIS_EMPLOYEE_ERROR';

export const REGISTER_EMPLOYEE_ERROR = 'REGISTER_EMPLOYEE_ERROR';
export const REGISTER_EMPLOYEE_SUCCESS = 'REGISTER_EMPLOYEE_SUCCESS';

export const LOGIN_EMPLOYEE_SUCCESS = 'LOGIN_EMPLOYEE_SUCCESS';
export const LOGIN_EMPLOYEE_ERROR = 'LOGIN_EMPLOYEE_ERROR';
export const SET_COMPANY_ID_AFTER_REGISTRATION = 'SET_COMPANY_ID_AFTER_REGISTRATION';

export const SET_EMPLOYEE = 'SET_EMPLOYEE';
export const SET_COMPANY = 'SET_COMPANY';
export const LOG_OUT_COMPANY = 'LOG_OUT_COMPANY';

export const LOG_OUT_EMPLOYEE = 'LOG_OUT_EMPLOYEE';

// this get's called after the server registers a new employee
export function registerEmployeeSuccess(employee) {

  return {
    type: REGISTER_EMPLOYEE_SUCCESS,
    payload: employee,
  };
}

export function registerEmployeeError(error) {
  return {
    type: REGISTER_EMPLOYEE_ERROR,
    payload: { error, isFetching: false },
  };
}

export function setSiteIdle() {
  return {
    type: SITE_IDLE,
    payload: { isFetching: false },
  };
}

export function siteFetch() {
  return {
    type: SITE_IS_FETCHING,
    payload: true,
  };
}

export function registerEmployee(employeOjbect) {

  return (dispatch) => {

    dispatch(siteFetch());

    console.log("going to attempt to create a new employee:", employeOjbect);

    let employeeWrapper : EmployeeWrapper = {
      company: null,
      companyId: null,
      employee: {...employeOjbect}
    };

    axios.post(`${ROOT_URL}api/v1/employee/create`, employeeWrapper)
      .then((response) => {
        /*response: {employee, token}*/
        console.log("this is the reponse we get when we register:", response);


        localStorage.setItem('tkn', response.data.token);

        setAuth(response.data.token);

        dispatch(registerEmployeeSuccess(response.data.employee));
        dispatch(setSiteIdle());

      })
      .catch((error) => {
        console.log("we got an error on saving a new user: ", error);
        dispatch(setSiteIdle());
        dispatch(registerEmployeeError(error));
        dispatch(logInEmployeeError(error.response.data.message));

      });
  };

}

// =============================
// CLEAR
// =============================
export function clearCompany() {
  return {
    type: LOG_OUT_COMPANY,
    payload: 'log out company',
  };
}

export function clearEmployee() {
  return {
    type: LOG_OUT_EMPLOYEE,
    payload: 'employee being logged out...',
  };
}

export function logOutEmployee() {

  // clear the local storage
  localStorage.clear();
  removeAuth();

  return (dispatch) => {
    dispatch(clearCompany());
    dispatch(clearEmployee());
    dispatch(setSiteIdle());
  };
}

// =============================
// SETTING COMPANY
// =============================
export function setCompany(company: Company) {
  return {
    type: SET_COMPANY,
    payload: company,
  };
}

// =============================
// SETTING EMPLOYEE
// =============================
export function setEmployee(employee: Employee) {
  return dispatch => dispatch({
    type: SET_EMPLOYEE,
    payload: employee,
  });
}

// =============================
// LOGIN
// =============================

export function logInEmployeeError(error) {
  return {
    type: ADD_LOGIN_ERROR,
    payload: { typeOfError: 'employee', message: error },
  };
}

export function removeLogInError() {
  return {
    type: REMOVE_LOGIN_ERROR,
    payload: 'removing error',
  };
}

export function clearAllErrors() {
  console.log('clearing all errors!');
  return {
    type: CLEAR_ALL_ERRORS,
  };
}

// updated the employee model with company id after one is registered
export function setCompanyIdAfterRegistration(data){
  return{
    type: SET_COMPANY_ID_AFTER_REGISTRATION,
    payload: data,
  }
}

// requires a employee and token property
export function logInEmployeeSuccess(data) {
  return {
    type: LOGIN_EMPLOYEE_SUCCESS,
    payload: data,
  };

}

// gets the token passed from localStorage
export function logInOnLoad(token) {

  console.log("loginOnLoad with:", token);

  return (dispatch) => {

    dispatch(siteFetch());
    axios.post(`${ROOT_URL}/auth/login/logcheck`, token )
      .then((response) => {
        // response contains uer, which is our decoded token
        // set token as part of our request headers
        setAuth(token);

        console.log("login/logcheck", response);

        if (response.data.employee.companyIdentifier !== null) {
          console.log("logInOnLoad: ", response.data.company);
          dispatch(setCompanyAndEmployee(response.data.company, response.data.employee));
        } else {
            console.log("was null so we're calling logInEmployeeSuccess with : ", response.data.employee);
          dispatch(logInEmployeeSuccess(response.data.employee));
          dispatch(setSiteIdle());
        }

      })
      .catch((error) => {
        // const errorMsg = error.response.data.message;
        const errorMsg = "credentials expired";
        if (errorMsg === 'credentials expired') {
          // TODO we need to send them to the log in page
          console.log('we need to have them re-log');
        }
        dispatch(clearAllErrors());
        dispatch(setSiteIdle());
      });
  };
}

// this will dispatch the employee email and password to server for verification
export function logInEmployee(employee) {
  /*employee = {
    email
    password
  };*/
    console.log("logging in with this employee:", employee);
    employee.username = employee.email;
  return (dispatch) => {

    dispatch(siteFetch());
    localStorage.clear();
      const newEmployee = {
          email: employee.email,
          password: employee.password
      };

      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "json")


    axios.post(`${ROOT_URL}auth/login/employee`, newEmployee,{
        method: "post",
    })
      .then((response) => {
          console.log("the resposne that we are getting..", response);

        // save token to local storage
        const token = response.data.token;
        localStorage.setItem('tkn', token);

        // set the token as part of our request header
        setAuth(token);

        if (response.data.employee.companyIdentifier !== null) {
          dispatch(setCompanyAndEmployee(response.data.company, response.data.employee));
        } else {
          console.log("it did equal null now where here");
          dispatch(logInEmployeeSuccess(response.data.employee));
          dispatch(setSiteIdle());
        }

      })
      .catch((error) => {
        console.log("we are not finding the employee:", error.response.data);
        dispatch(setSiteIdle());
        dispatch(logInEmployeeError(error.response.data.message));

      });
  };
}

export function setCompanyAndEmployee(company, employee) {
  console.log("setCompanyAndEmployee", company, employee);
  return (dispatch) => {
    dispatch(setSiteIdle());
    // dispatch()
    console.log("going to call with: ", company.id);
    dispatch(fetchAllCompanyJobModels(company.id));
    dispatch(removeLogInError());
    dispatch(setCompany(company));
    dispatch(setCompanyIdAfterRegistration({companyIdentifier: company.id}));
    dispatch(logInEmployeeSuccess(employee));
  };
}
