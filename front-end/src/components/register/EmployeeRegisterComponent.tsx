import * as React from 'react';
import {Link, Redirect} from 'react-router-dom';

import {AuthEmployee, SiteFetching, Employee} from '../../types';
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
}

interface MyState {
  redirect: false;
}

class EmployeeRegisterComponent extends React.Component<MyProps, MyState> {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
  }

  componentDidMount(): void {
  }

  componentDidUpdate(prevProps: Readonly<MyProps>, prevState: Readonly<MyState>, prevContext: any): void {
  }

  componentWillMount(): void {
  }

  componentWillReceiveProps(nextProps: Readonly<MyProps>, nextContext: any): void {
  }

  componentWillUnmount(): void {
  }

  componentWillUpdate(nextProps: Readonly<MyProps>, nextState: Readonly<MyState>, nextContext: any): void {
  }

  shouldComponentUpdate(nextProps: Readonly<MyProps>, nextState: Readonly<MyState>, nextContext: any): boolean {
    return false;
  }

  private inputs: FormInputs[] = [
    {
      label: 'First Name',
      required: true,
      type: 'text',
      placeHolder: 'Enter First Name',
      id: 'firstName',
    },
    {
      label: 'Last Name',
      required: true,
      type: 'text',
      placeHolder: 'Enter Last Name',
      id: 'lastName',
    },
    {
      label: 'Email',
      required: true,
      type: 'email',
      placeHolder: 'Enter your email',
      id: 'email',
    },
    {
      label: 'Confirm Email',
      required: true,
      type: 'email',
      placeHolder: 'Please confirm your email',
      id: 'email-verify',
    },
    {
      label: 'Password',
      required: true,
      type: 'password',
      placeHolder: 'Enter password',
      id: 'password',
    },
    {
      label: 'Verify Password',
      required: true,
      type: 'password',
      placeHolder: 'Please Verify Password',
      id: 'password-verify',
    },
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
      companyId: "",
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
    return (
      <Redirect to={`/employee/dashboard/${this.props.employee.id}/register`} push/>
    );
  }

  returnRegisterForm() {

    return (
      <div className="company-register-Component">
        <div className="register-form">
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
          {this.props.employee.companyId !== null ? this.redirectToDashboard() : null}
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
