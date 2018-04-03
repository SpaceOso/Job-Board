import * as React from 'react';
import { connect } from 'react-redux';

// components
import { logInEmployee } from '../../actions/authActions';
import { StoreState, Employee } from '../../types';
import LoginComponent from './LoginComponent';
// styles
import './styles/LoginComponent.scss';

function mapStateToProps({ employee, siteFetching, siteErrors }: StoreState) {
  return {
      employee,
    siteFetching,
    siteErrors,

  };
}

const mapDispatchToProps = dispatch => ({
  logInEmployee: (employeeInfo) => {
    dispatch(logInEmployee(employeeInfo));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
