import {
  DONE_FETCHING, FETCHING_JOBS,
  RESET_CURRENT_JOB, SET_CURRENT_JOB,
  SINGLE_JOB_SUCCESS,
} from '../actions/jobActions';
import {JobPost} from '../types';

const thisState: JobPost = {
  isFetching: false,
  job: {
    id: '',
    title: '',
    description: '',
    companyId: '',
    createdDate: null,
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
  },
  company: {
    id: '',
    applicantList: null,
    name: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
    linkedIn: null,
    facebook: null,
    logoImg: null,
    twitter: null,
    website: null,
    jobs: [],
    isFetching: false,
  },
};

function currentJobPostReducer(state = thisState, action) {
  switch (action.type) {
    case FETCHING_JOBS:
      return {
        ...state,
        isFetching: true,
      };
    case DONE_FETCHING: {
      return {
        ...state,
        isFetching: false,
      };
    }
    case SET_CURRENT_JOB: {
      const currentJob: JobPost = {
        isFetching: false,
        ...action.payload.data.job,
        ...action.payload.data.company,
      };

      console.log("sending:", currentJob);

      return {
        ...state,
        ...currentJob
      };
    }
    case SINGLE_JOB_SUCCESS:
      console.log("single jobPost success:", action.payload);
      return {
        ...state,
        ...action.payload,
        isFetching: false,
      };
    case RESET_CURRENT_JOB:
      return {
        ...thisState,
      };
    default:
      return state;
  }
}

export default currentJobPostReducer;
