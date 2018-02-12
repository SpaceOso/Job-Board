import * as React from 'react';
import { connect } from 'react-redux';
import { getJobs } from '../../../actions/jobActions';

// style
import './JoblistContainer.scss';

// component
import JobListComponent from './JobListComponent';

// interfaces
import { StoreState } from '../../../types';

function mapPropsToState({ jobs }: StoreState) {
  return {
    jobs,
  };
}

const mapDispatchToProps = dispatch => ({
  getJobs: () => dispatch(getJobs()),
});

export default connect(mapPropsToState, mapDispatchToProps)(JobListComponent);
