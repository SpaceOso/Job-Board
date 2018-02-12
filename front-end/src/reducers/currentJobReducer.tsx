import {
  DONE_FETCHING, FETCHING_JOBS,
  RESET_CURRENT_JOB, SET_CURRENT_JOB,
  SINGLE_JOB_SUCCESS,
} from '../actions/jobActions';
import { CurrentJobPost } from '../types';

const thisState: CurrentJobPost = {
  id: '',
  title: '',
  description: '',
  employerId: '',
  isFetching: false,
  createdAt: '',
  location: {
    address: '',
    city: '',
    state: '',
    zip: '',
  },
  Employer: {
    id: '',
    name: '',
    location: {
      address: '',
      city: '',
      state: '',
      zip: '',
    },
    linkedIn: null,
    facebook: null,
    logoImg: null,
    twitter: null,
    website: null,
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
      return {
        ...state,
        ...action.payload,
        isFetching: false,
      };
    }
    case SINGLE_JOB_SUCCESS:
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
