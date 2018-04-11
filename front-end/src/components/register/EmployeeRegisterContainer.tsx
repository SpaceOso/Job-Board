import * as React from 'react';
import { connect } from 'react-redux';
import { registerEmployee } from '../../actions/authActions';
import { StoreState, Employee } from '../../types/index';
import EmployeeRegisterComponent from './EmployeeRegisterComponent';

// styles
import './styles/EmployeeRegister.scss';

function mapStateToProps({ employee, siteFetching, siteErrors }: StoreState) {
  return {
    employee,
    siteFetching,
    siteErrors
  };
}

const mapDispatchToProps = dispatch => ({
  registerEmployee: (employee: Employee) => dispatch(registerEmployee(employee)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeRegisterComponent);
