import * as React from 'react';

import * as bcrypt from 'bcryptjs';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import {SiteErrors, SiteFetching, Employee, AuthEmployee} from '../../types';
import SimpleForm, {SFInput} from '../simple-form/SimpleForm';
import { default as SpinnerComponent } from '../spinners/spinnerComponent';

/**
 * styles
 */
import './styles/LoginComponent.scss';

interface MyProps {
  employee: AuthEmployee;
  logInEmployee: (employeeInfo) => {};
  siteFetching: SiteFetching;
  siteErrors: SiteErrors;
}

interface MyState {
    employeeEmail: string;
    employeePassword: string;
  redirect: string;
  isFetching: boolean;
  errors: object;
}

class LogInComponent extends React.Component<MyProps, MyState> {
  private inputs: SFInput[][] = [
    [
      {
        label: 'Enter Email:',
        required: true,
        type: 'email',
        placeHolder: 'Enter Email:',
        errorText: 'Please Enter an email',
        id: 'email',
      },
      {
        label: 'Enter Password:',
        required: true,
        type: 'password',
        errorText: 'Please Enter a Password',
        placeHolder: 'Enter Password',
        id: 'password',
      },
    ]
  ];

  constructor(props) {
    super(props);

    this.state = {
        employeeEmail: '',
        employeePassword: '',
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

  handleSubmit(employeeObject) {

      console.log("LoginComponent callback: ", employeeObject);

    const employee = {
      email: employeeObject.email,
      password: employeeObject.password,
    };

    this.props.logInEmployee(employee);
  }

  handleLoginRoute() {
    if (this.props.employee.isAuth) {
      if (this.props.employee.companyIdentifier !== null) {
        return <Redirect to={`${'/employee/dashboard/'}${this.props.employee.id}/home`}/>;
      }
      return <Redirect to={`${'/employee/dashboard/'}${this.props.employee.id}/register`}/>;
    }

    return null;
  }

  render() {

    const formStyle = {
      width: '24%',
    };

    return (
      this.props.siteFetching.isFetching === true ?

        <SpinnerComponent/> :
        (
          <div className="company-register-Component">
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
              style={formStyle}
              // joined={true}
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
