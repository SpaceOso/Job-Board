// action types
import {FETCHING_JOBS, GET_JOBS_ERROR, GET_JOBS_SUCCESS} from '../actions/jobActions';
import {Job, JobPost, StoreState} from '../types/index';

/*reducers are just functions that get passed the action. We then set up switch statements to handle the action.type*/
function jobReducer(state: StoreState, action) {
    switch (action.type) {
        case GET_JOBS_SUCCESS:

            const newJobs = {};
            const jobDateRegex: RegExp = /.+?(?=T)/g;

            action.payload.data.map((job) => {
                //TODO need to create a jobPost model based on the backend jobwrapper
                let currentJob: JobPost = {
                    isFetching: false,
                    job: {...job.job},
                    company: {...job.company}
                };

                newJobs[currentJob.job.id] = {...currentJob};
            });
            return newJobs;
        case GET_JOBS_ERROR:

            return state;
        case FETCHING_JOBS:
            return {
                ...state,
                isFetching: true,
            };
        default:
            return {
                ...state,
            };
    }
}

export default jobReducer;
