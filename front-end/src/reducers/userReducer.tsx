import {
  REGISTER_USER,
  FETCHING_USER,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOG_OUT_USER,
  SET_USER,
  FETCHING_THIS_USER_ERROR,
} from '../actions/authActions';
import { User } from "../types/index";

const defaultState: User = {
  id: null,
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  employerId: null,
  isAuth: false,
  isFetching: false,
  error: null,
};

function userReducer(state = defaultState, action): any {
// function userReducer(state, action):User {
  switch (action.type) {
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuth: true,
        isFetching: false,
      };

    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuth: true,
        isFetching: false,
      };
    case LOG_OUT_USER:

      return {
        ...defaultState,
      };
    case FETCHING_USER:
      return {
        ...state,
        isFetching: true,
      };

    case SET_USER:
      let set_user: any = {
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
    case FETCHING_THIS_USER_ERROR:
      return {
        ...state,
        isFetching: false,
        isAuth: false,
      };
    case LOGIN_USER_ERROR:
      return {
        ...state,
        error: action.errorMessage,
        isFetching: false,
      };

    case REGISTER_USER_ERROR:
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

export default userReducer;
