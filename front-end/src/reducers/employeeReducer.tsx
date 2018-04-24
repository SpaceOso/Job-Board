import {
  REGISTER_EMPLOYEE,
  FETCHING_EMPLOYEE,
  REGISTER_EMPLOYEE_ERROR,
  REGISTER_EMPLOYEE_SUCCESS,
  LOGIN_EMPLOYEE_SUCCESS,
  LOGIN_EMPLOYEE_ERROR,
  LOG_OUT_EMPLOYEE,
  SET_EMPLOYEE,
  FETCHING_THIS_EMPLOYEE_ERROR, SET_COMPANY_ID_AFTER_REGISTRATION,
} from '../actions/authActions';
import {AuthEmployee} from "../types/index";

const defaultState: AuthEmployee = {
  id: null,
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  companyIdentifier: null,
  isAuth: false,
  isFetching: false,
  error: null,
};

function employeeReducer(state = defaultState, action): any {
// function employeeReducer(state, action):Employee {
  switch (action.type) {
    case REGISTER_EMPLOYEE_SUCCESS:
      console.log("REGISTER_EMPLOYE_SUCCESS");
      return {
        ...state,
        ...action.payload,
        isAuth: true,
        isFetching: false,
      };
    case SET_COMPANY_ID_AFTER_REGISTRATION:
      return {
        ...state,
        ...action.payload,
        // isAuth: true,
        isFetching: false,
      };
    case LOGIN_EMPLOYEE_SUCCESS:
        console.log("updating login employee sucess with:", action.payload);
      return {
        ...state,
        ...action.payload,
        isAuth: true,
        isFetching: false,
      };
    case LOG_OUT_EMPLOYEE:

      return {
        ...defaultState,
      };
    case FETCHING_EMPLOYEE:
      return {
        ...state,
        isFetching: true,
      };

    case SET_EMPLOYEE:
      let set_employee: any = {
        ...state,
        ...action.payload,
        isFetching: false,
        isAuth: true,
      };
      return {
        ...state,
        ...action.payload,
        isFetching: false,
        isAuth: true,
      };
    case FETCHING_THIS_EMPLOYEE_ERROR:
      return {
        ...state,
        isFetching: false,
        isAuth: false,
      };
    case LOGIN_EMPLOYEE_ERROR:
      return {
        ...state,
        error: action.errorMessage,
        isFetching: false,
      };

    case REGISTER_EMPLOYEE_ERROR:
      // todo need to properly handle this case
      return {
        ...state,
      };

    default:
      return {
        ...state,
      };

  }
}

export default employeeReducer;
