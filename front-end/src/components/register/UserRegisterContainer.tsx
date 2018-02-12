import * as React from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import { StoreState, User } from '../../types/index';
import UserRegisterComponent from './UserRegisterComponent';

// styles
import './styles/UserRegister.scss';

function mapStateToProps({ user, siteFetching }: StoreState) {
  return {
    user,
    siteFetching,
  };
}

const mapDispatchToProps = dispatch => ({
  registerUser: (user: User) => dispatch(registerUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserRegisterComponent);
