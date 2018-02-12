import * as React from 'react';

import * as bcrypt from 'bcryptjs';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { SiteErrors, SiteFetching, User } from '../../types';
import SimpleForm from '../simple-form/SimpleForm';
import { default as SpinnerComponent } from '../spinners/spinnerComponent';

/**
 * styles
 */
import './styles/LoginComponent.scss';

interface MyProps {
  user: User;
  logInUser: (userInfo) => {};
  siteFetching: SiteFetching;
  siteErrors: SiteErrors;
}

interface MyState {
  userEmail: string;
  userPassword: string;
  redirect: string;
  isFetching: boolean;
  errors: object;
}

class LogInComponent extends React.Component<MyProps, MyState> {
  private inputs = [
    {
      label: 'Enter Email:',
      required: true,
      type: 'email',
      placeHolder: 'Enter Email:',
      id: 'email',
    },
    {
      label: 'Enter Password:',
      required: true,
      type: 'password',
      placeHolder: 'Enter Password',
      id: 'password',
    },
  ];

  constructor(props) {
    super(props);

    this.state = {
      userEmail: '',
      userPassword: '',
      redirect: '',
      isFetching: false,
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLoginRoute = this.handleLoginRoute.bind(this);
  }

  handleChange(key, event) {
    const keyObject = { ...this.state };

    keyObject[ key ] = event;

    this.setState(keyObject);
  }

  handleSubmit(userObject) {

    const user = {
      email: userObject.email,
      password: userObject.password,
    };

    this.props.logInUser(user);
  }

  handleLoginRoute() {
    if (this.props.user.isAuth) {
      if (this.props.user.employerId !== null) {
        return <Redirect to={`${'/user/dashboard/'}${this.props.user.id}/home`}/>;
      }
      return <Redirect to={`${'/user/dashboard/'}${this.props.user.id}/register`}/>;
    }

    return null;
  }

  render() {
    return (
      this.props.siteFetching.isFetching === true ?

        <SpinnerComponent/> :
        (
          <div className="employer-register-Component">
            {this.handleLoginRoute()}
            <h3>{this.props.siteErrors.login !== null ? this.props.siteErrors.login.message : null}</h3>
            <div>
              {this.props.siteFetching.isFetching ? <SpinnerComponent/> : null}
            </div>
            <SimpleForm
              header="Sign In"
              inputs={this.inputs}
              submitBtnText="Log In"
              verifyInputs={null}
              onSubmitCB={this.handleSubmit}
            />
            <div>
              <p>
                Don't have an account?
              </p>
              <Link to={'/register'} className="link-standard">
                Create one free
              </Link>
            </div>
          </div>
        )
    );
  }
}

export default LogInComponent;
