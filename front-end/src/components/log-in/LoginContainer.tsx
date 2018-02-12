import * as React from 'react';
import { connect } from 'react-redux';

// components
import { logInUser } from '../../actions/authActions';
import { StoreState, User } from '../../types';
import LoginComponent from './LoginComponent';
// styles
import './styles/LoginComponent.scss';

function mapStateToProps({ user, siteFetching, siteErrors }: StoreState) {
  return {
    user,
    siteFetching,
    siteErrors,

  };
}

const mapDispatchToProps = dispatch => ({
  logInUser: (userInfo) => {
    dispatch(logInUser(userInfo));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
