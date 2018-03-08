// action types
import { FETCHING_JOBS, GET_JOBS_ERROR, GET_JOBS_SUCCESS } from '../actions/jobActions';
import {Job, StoreState} from '../types/index';

/*reducers are just functions that get passed the action. We then set up switch statements to handle the action.type*/
function jobReducer(state: StoreState, action) {
  switch (action.type) {
    case GET_JOBS_SUCCESS:

      const newJobs = {};
      const jobDateRegex: RegExp = /.+?(?=T)/g;

      console.log("now in reducer with: ", action.payload.data);
      action.payload.data.map((job) => {
          console.log("Current job:", job.job);
          //TODO need to create a job model based on the backend jobwrapper
          const currentJob : Job = {...job.job};
          currentJob.employer = {...job.employer};
          console.log("date..", Date.parse(job.createdDate));
          // let splitDate : String[];
          // splitDate = currentJob.createdAt.match(jobDateRegex)[ 0 ].split('-');
          // currentJob.createdAt = `${splitDate[ 1 ]}-${splitDate[ 2 ]}-${splitDate[ 0 ]}`;
          currentJob.createdDate = "sorynodate";

          newJobs[ currentJob.id ] = { ...currentJob };
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
