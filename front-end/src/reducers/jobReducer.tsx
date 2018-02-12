// action types
import { FETCHING_JOBS, GET_JOBS_ERROR, GET_JOBS_SUCCESS } from '../actions/jobActions';
import { StoreState } from '../types/index';

/*reducers are just functions that get passed the action. We then set up switch statements to handle the action.type*/
function jobReducer(state: StoreState, action) {
  switch (action.type) {
    case GET_JOBS_SUCCESS:

      const newJobs = {};
      const jobDateRegex: RegExp = /.+?(?=T)/g;

      for (const job in action.payload.data) {
        if (action.payload.data.hasOwnProperty(job)) {
          const currentJob = action.payload.data[ job ];
          const splitDate = currentJob.createdAt.match(jobDateRegex)[ 0 ].split('-');
          currentJob.createdAt = `${splitDate[ 1 ]}-${splitDate[ 2 ]}-${splitDate[ 0 ]}`;

          newJobs[ currentJob.id ] = { ...currentJob };
        }
      }

      return action.payload.data;
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
