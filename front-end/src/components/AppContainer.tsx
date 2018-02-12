import * as React from 'react';
import { connect } from 'react-redux';
import { logInOnLoad, logOutUser } from '../actions/authActions';
import { StoreState } from '../types/index';

import App from './App';

const mapDispatchToProps = dispatch => ({
  logInOnLoad: token => dispatch(logInOnLoad(token)),
  logOutUser: () => dispatch(logOutUser()),
});

// function mapStateToProps(state : StoreState){
function mapStateToProps({ user, employer, siteErrors, siteFetching }: StoreState) {
  return {
    user,
    employer,
    siteFetching,
    siteErrors,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
