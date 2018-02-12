import { ADD_LOGIN_ERROR, CLEAR_ALL_ERRORS, REMOVE_LOGIN_ERROR } from '../actions';
import { SiteErrors } from '../types';

const defaultState: SiteErrors = {
  login: null,
  dashBoard: null,
  dataRequest: null,

};

function siteErrorReducer(state = defaultState, action) {
  switch (action.type) {
    case ADD_LOGIN_ERROR:
      return {
        ...state,
        login: action.payload,
      };

    //if there is current errors
    /*if(state.login !== null){
      let newErrorArray = state.login.slice();
      newErrorArray.push({...action.payload});
      return {
        ...state,
        login: newErrorArray
      }
    } else {
      let loginArray:SiteError[] = [];
      loginArray.push({...action.payload});
      return{
        ...state,
        login: loginArray
      };
    }*/
    case REMOVE_LOGIN_ERROR:
      return {
        ...state,
        login: null,
      };
    case CLEAR_ALL_ERRORS:
      return {
        ...state,
        login: 'adadsfasdlkj',
        dashBoard: null,
        dataRequest: null,
      };
    default:
      return {
        ...state,
      }
  }
}

export default siteErrorReducer;