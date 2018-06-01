import * as React from 'react';
import {Link, Redirect} from 'react-router-dom';

import {AuthEmployee, SiteFetching, Employee, SiteErrors} from '../../types';
import SimpleForm from '../simple-form/SimpleForm';
import {default as SpinnerComponent} from '../spinners/spinnerComponent';

// styles
import './styles/EmployeeRegister.scss';

export interface MyProps {
  event: Event;
  redirect: false;
  registerEmployee: (employee: AuthEmployee) => any;
  employee: AuthEmployee;
  siteFetching: SiteFetching;
  siteErrors: SiteErrors;
  errors: {
    fName: boolean;
    lName: boolean;
    email: boolean;
    verifyEmail: boolean;
    password: boolean;
    passwordVerify: boolean;
  };
}

interface FormInputs {
  label: string;
  required: boolean;
  type: string;
  placeHolder: string;
  id: string;
  groupId: number | null;
}

interface MyState {
  redirect: false;
}

class EmployeeRegisterComponent extends React.Component<MyProps, MyState> {

  private inputs: FormInputs[][] = [
    [
      {
        label: 'First Name',
        required: true,
        type: 'text',
        placeHolder: 'Enter First Name',
        id: 'firstName',
        groupId: 0,
      },
      {
        label: 'Last Name',
        required: true,
        type: 'text',
        placeHolder: 'Enter Last Name',
        id: 'lastName',
        groupId: 0,
      },
    ],
    [
      {
        label: 'Email',
        required: true,
        type: 'email',
        placeHolder: 'Enter your email',
        id: 'email',
        groupId: 1,
      },
      {
        label: 'Confirm Email',
        required: true,
        type: 'email',
        placeHolder: 'Please confirm your email',
        id: 'email-verify',
        groupId: 1,
      },
    ],
    [
      {
        label: 'Password',
        required: true,
        type: 'password',
        placeHolder: 'Enter password',
        id: 'password',
        groupId: 2,
      },
      {
        label: 'Verify Password',
        required: true,
        type: 'password',
        placeHolder: 'Please Verify Password',
        id: 'password-verify',
        groupId: 2,
      },
    ]
  ];

  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
    };

    this.returnRegisterForm = this.returnRegisterForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.redirectToDashboard = this.redirectToDashboard.bind(this);
  }

  handleSubmit(employee: AuthEmployee) {

    //TODO this is wher eyou want to encrypt password on the client side
    const newEmployee: AuthEmployee = {
      id: null,
      companyIdentifier: "",
      email: employee.email,
      firstName: employee.firstName,
      lastName: employee.lastName,
      password: employee.password,
      isAuth: false,
      isFetching: false,
      error: "",
    };


    console.log('we\'re trying to submit newEmployee:', newEmployee);
    this.props.registerEmployee(newEmployee);
  }

  redirectToDashboard() {
    console.log("redirectToDashboard...");
    return (
      <Redirect to={`/employee/dashboard/${this.props.employee.id}/register`} push/>
    );
  }

  returnRegisterForm() {

    return (
      <div className="company-register-Component">
        <div className="register-form">
          <h3>{this.props.siteErrors.login !== null ? this.props.siteErrors.login.message : null}</h3>
          <SimpleForm
            header="Sign Up"
            inputs={this.inputs}
            submitBtnText="Register Account"
            onSubmitCB={this.handleSubmit}
            verifyInputs={['email', 'password']}
            joined={true}
            style={{width: '57rem'}}
          />
          <div>
            <p>
              Already have an account?
            </p>
            <Link to={'/login'} className="link-standard">
              Login here
            </Link>
          </div>
          {/*Once the employee registers it should take them to the dashboard*/}
          {this.props.employee.isAuth === true ? this.redirectToDashboard() : null}
          {/*This will display once we register our employee*/}
          {this.props.employee.companyIdentifier !== null ? this.redirectToDashboard() : null}
        </div>
      </div>
    );
  }

  render() {

    if (this.props.siteFetching.isFetching === true) {
      return <SpinnerComponent/>;
    }

    return this.returnRegisterForm();
  }
}

export default EmployeeRegisterComponent;
