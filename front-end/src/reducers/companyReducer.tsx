import {
  FETCHING_THIS_COMPANY_JOBS,
  GET_THIS_COMPANY_JOBS_SUCCESS,
  REGISTER_COMPANY_SUCCESS,
} from '../actions/companyDashboardActions';

import {
    LOG_OUT_COMPANY

} from '../actions/authActions';

import {COMPANY_FETCHING, COMPANY_IDLE, EDITING_JOB_POST_SUCCESS, SET_COMPANY} from '../actions';
import { Company } from '../types';

const defaultState: Company = {
  id: null,
  name: null,
  address: null,
  logoImg: null,
  website: null,
  twitter: null,
  facebook: null,
  linkedIn: null,
  applicantList: null,
  jobs: null,
  isFetching: false,
};

// this deals with with the company property of the state
function companyReducer(state = defaultState, action): any {

  switch (action.type) {
    case FETCHING_THIS_COMPANY_JOBS:
      return state;
    case GET_THIS_COMPANY_JOBS_SUCCESS:
      console.log("the jobs we're about to add to the store: ", action.payload.data.jobApplicantList);
      return {
        ...state,
        jobs: [...action.payload.data.jobList],
        applicantList: {...action.payload.data.jobApplicantList}
      };
    case EDITING_JOB_POST_SUCCESS:
      let newArr;
      if (state.jobs !== null) {
        newArr = state.jobs.slice();
        newArr.push(action.payload);
      } else {
        newArr = [];
        newArr.push(action.payload);
      }

      console.log('newArr:', newArr);

      return {
        ...state,
        jobs: [...newArr],
        isFetching: false,
      };
    case COMPANY_FETCHING:
      return {
        ...state,
        isFetching: true,
      };
    case COMPANY_IDLE:
      return {
        ...state,
        isFetching: false,
      };
    case REGISTER_COMPANY_SUCCESS:
      // will set company after we register in the compRegisterComponent
      return state;
    case LOG_OUT_COMPANY:
      return {
        ...defaultState,
      };
    case SET_COMPANY:
      console.log('SET_COMPANY');
      return {
        ...state,
        ...action.payload,
        isFetching: false
      };
    default:
      return state;
  }
}

export default companyReducer;
