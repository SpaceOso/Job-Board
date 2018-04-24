import {combineReducers} from 'redux';

import jobs from './jobReducer';
import currentJobPost from './currentJobReducer';
import employee from './employeeReducer';
import company from './companyReducer';
import siteFetching from './siteFetchingReducer';
import siteErrors from './siteErrorReducer';

// these keys need to be named the same as the keys in the default state
const rootReducer = combineReducers({
    jobs,
    currentJobPost,
    employee,
    company,
    siteFetching,
    siteErrors,
});

export default rootReducer;
