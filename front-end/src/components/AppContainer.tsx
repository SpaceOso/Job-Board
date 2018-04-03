import * as React from 'react';
import { connect } from 'react-redux';
import { logInOnLoad, logOutEmployee } from '../actions/authActions';
import { StoreState } from '../types/index';

import App from './App';

const mapDispatchToProps = dispatch => ({
  logInOnLoad: token => dispatch(logInOnLoad(token)),
  logOutEmployee: () => dispatch(logOutEmployee()),
});

// function mapStateToProps(state : StoreState){
function mapStateToProps({ employee, company, siteErrors, siteFetching }: StoreState) {
  return {
      employee,
      company,
    siteFetching,
    siteErrors,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
