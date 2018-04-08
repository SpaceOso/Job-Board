import * as React from 'react';

// styles
import { Redirect, RouteComponentProps } from 'react-router';
import {AuthEmployee, Company, Employee} from '../../../types';
import SimpleForm, { SFInput } from '../../simple-form/SimpleForm';
import { default as SpinnerComponent } from '../../spinners/spinnerComponent';
import './styles/CompRegisterComponent.scss';

interface CompRegisterProps extends RouteComponentProps<any> {
  submitData;
  employee: AuthEmployee;
}

interface MyState {
  currentForm: number;
  forms: JSX.Element[];
}

class CompRegisterComponent extends React.Component<CompRegisterProps, MyState> {
  private filesInput: HTMLInputElement;
  private inputs: SFInput[] = [
    {
      label: 'Company Name',
      required: true,
      type: 'text',
      placeHolder: 'Enter company name',
      id: 'name',
    },
    {
      label: 'Company logo:',
      required: false,
      type: 'file',
      name: 'company-logo',
      accept: 'image/gif, image/png, image/jpeg',
      placeHolder: 'Upload company logo',
      id: 'logo',
    },
    {
      label: 'Company Website',
      required: true,
      type: 'text',
      placeHolder: 'website',
      id: 'website',
    },
    {
      label: 'twitter',
      required: false,
      type: 'text',
      placeHolder: 'twitter',
      id: 'twitter',
    },
    {
      label: 'facebook',
      required: false,
      type: 'text',
      placeHolder: 'facebook',
      id: 'facebook',
    },
    {
      label: 'linkedin',
      required: false,
      type: 'text',
      placeHolder: 'linkedin',
      id: 'linkedIn',
    },
    {
      label: 'street:',
      required: true,
      type: 'address',
      placeHolder: 'address',
      id: 'street',
    },
    {
      label: 'city:',
      required: true,
      type: 'text',
      placeHolder: 'city',
      id: 'city',
    },
    {
      label: 'state:',
      required: true,
      type: 'text',
      placeHolder: 'state',
      id: 'state',
    },
    {
      label: 'zip',
      required: true,
      type: 'text',
      placeHolder: 'zip',
      id: 'zip',
    },
  ];

  constructor(props) {
    super(props);

    this.state = {
      currentForm: 0,
      forms: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCompanySubmit = this.handleCompanySubmit.bind(this);
    this.renderRegisterForm = this.renderRegisterForm.bind(this);
  }

  /**
   * This well send the update state to the back end
   */
  handleCompanySubmit(formData) {
    // testing what the object we're sending the back end looks like:
    let company : Company = {
      id: null,
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zip,
      },
      facebook: formData.facebook,
      twitter: formData.twitter,
      website: formData.website,
      linkedIn: formData.linkedIn,
      jobs: null,
      isFetching: null,
      logoImg: formData.logo !== undefined ? formData.logo.name : null,
      name: formData.name
    };


    let companyWrapper = {
      company: company,
      employeeId: this.props.employee.id,
      logoFile: formData.logo
    };

    console.log("CompRegisterComponent", companyWrapper);

    this.props.submitData(companyWrapper, formData.logo);

    /* If there was a file uploaded update logoImg state property */
   /* if (formData.logo !== undefined) {
      this.props.submitData(formData, formData.logo);
    } else {
      this.props.submitData(formData, null);
    }*/

  }

  handleChange(key, event) {
    const keyObject = { ...this.state };

    keyObject[ key ] = event;

    this.setState(keyObject);
  }

  renderRegisterForm() {
    return (
      <div className="comp-register">
        <h1>We need to set up your company before we can start!</h1>
        <div className="form-container">
          <div id="location-group">
            <SimpleForm
              header={'Company Information'}
              inputs={this.inputs}
              joined={true}
              style={{width: 'auto'}}
              submitBtnText={'Enter Company'}
              verifyInputs={null}
              onSubmitCB={this.handleCompanySubmit}
            />
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.props.employee.isFetching) {
      return <SpinnerComponent/>;
    }

    // if the user does have a companyIdentifier associated with account
    if (this.props.employee.companyIdentifier !== null) {
      return <Redirect to={`${'/employee/dashboard/'}${this.props.employee.id}/home `}/>;
    }

    return this.renderRegisterForm();
  }
}

export default CompRegisterComponent;
