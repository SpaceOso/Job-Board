import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';

import { AuthUser, SiteFetching, User } from '../../types';
import SimpleForm from '../simple-form/SimpleForm';
import { default as SpinnerComponent } from '../spinners/spinnerComponent';

// styles
import './styles/UserRegister.scss';

export interface MyProps {
  event: Event;
  redirect: false;
  registerUser: (user: AuthUser) => any;
  user: User;
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

class UserRegisterComponent extends React.Component<MyProps, MyState> {
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

  handleSubmit(userModel: AuthUser) {

    const newUser: AuthUser = {
      email: userModel.email,
      firstName: userModel.firstName,
      lastName: userModel.lastName,
      password: userModel.password,
    };

    console.log('we\'re trying to submit newUser:', newUser);
    this.props.registerUser(newUser);
  }

  redirectToDashboard() {
    return (
      <Redirect to={`/user/dashboard/${this.props.user.id}/register`} push/>
    );
  }

  returnRegisterForm() {

    return (
      <div className="employer-register-Component">
        <div className="register-form">
          <SimpleForm
            header="Sign Up"
            inputs={this.inputs}
            submitBtnText="Register Account"
            onSubmitCB={this.handleSubmit}
            verifyInputs={[ 'email', 'password' ]}
            joined={true}
            style={{ width: '57rem' }}
          />
          <div>
            <p>
              Already have an account?
            </p>
            <Link to={'/login'} className="link-standard">
              Login here
            </Link>
          </div>
          {/*Once the user registers it should take them to the dashboard*/}
          {this.props.user.isAuth === true ? this.redirectToDashboard() : null}
          {/*This will display once we register our user*/}
          {this.props.user.employerId !== null ? this.redirectToDashboard() : null}
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

export default UserRegisterComponent;
