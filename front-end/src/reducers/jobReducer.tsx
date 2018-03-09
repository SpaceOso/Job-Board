// action types
import {FETCHING_JOBS, GET_JOBS_ERROR, GET_JOBS_SUCCESS} from '../actions/jobActions';
import {Job, JobPost, StoreState} from '../types/index';

/*reducers are just functions that get passed the action. We then set up switch statements to handle the action.type*/
function jobReducer(state: StoreState, action) {
    switch (action.type) {
        case GET_JOBS_SUCCESS:

            const newJobs = {};
            const jobDateRegex: RegExp = /.+?(?=T)/g;

            console.log("now in reducer with: ", action.payload.data);
            action.payload.data.map((job) => {
                console.log("Current jobPost:", job.job);
                //TODO need to create a jobPost model based on the backend jobwrapper
                let currentJob: JobPost = {
                    isFetching: false,
                    job: {...job.job},
                    employer: {...job.employer}
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
