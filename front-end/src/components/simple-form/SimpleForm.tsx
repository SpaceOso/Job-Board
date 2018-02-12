import * as React from 'react';

import './SimpleForm.scss';
import SimpleFormInput from './SimpleFormInput';

export interface SFInput {
  label: string;
  required: boolean;
  type: string;
  name?: string;
  accept?: string;
  placeHolder: string;
  id: string;
}

interface FormObject {
  [key: string]: any;
}

interface MyProps {
  header: string;
  inputs: SFInput[];
  submitBtnText: string;
  verifyInputs: string[] | null;
  onSubmitCB: (any) => void;
  joined?: boolean;
  style?: {};
  cancelButton?: { click: (e: React.FormEvent<HTMLInputElement>) => void, btnText: string };
}

class SimpleForm extends React.Component<MyProps, any> {
  private filesArray: any = {};

  constructor(props) {
    super(props);

    const propObj: any = {};

    /**
     * Crate an object for each input to hold the user input and to know if there is an
     * error associated with that input.
     */
    this.props.inputs.map((input) => {
      propObj[ input.id ] = {
        content: '',
        SF_error: false,
        SF_errorMessage: '',
        type: input.type,
        required: input.required,
      };
    });

    this.state = {
      inputsToVerify: this.props.verifyInputs !== null ? this.props.verifyInputs.map(input => input + '-verify') : null,
      formSubmitted: false,
      formErrors: false,
      inputValues: { ...propObj },
    };

    this.createInputs = this.createInputs.bind(this);
    this.createFileInput = this.createFileInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   *
   * @param {string} key
   * @param event
   */
  handleChange(key, event): any {
    const keyObject = { ...this.state.inputValues };

    keyObject[ key ].content = event;

    this.setState({ inputValues: keyObject });
  }

  /**
   * Will either add or remove the SF_error and error message
   * @param {boolean} setError - Removes or adds error and message
   * @param {string} message - The message readout when displaying an error
   * @param {string} inputId - The indexed id of the input we want to alter
   */
  handleVerificationError(setError: boolean, message: string, inputId: string) {
    const inputRef = { ...this.state.inputValues };

    if (setError === true) {
      inputRef[ inputId + '-verify' ].SF_error = true;
      inputRef[ inputId + '-verify' ].SF_errorMessage = message;
    } else if (setError === false) {
      inputRef[ inputId + '-verify' ].SF_error = false;
      inputRef[ inputId + '-verify' ].SF_errorMessage = message;
    }

    this.setState({ inputValues: { ...inputRef } });
  }

  /**
   * Runs when form is submitted.
   * Checks if any two items that need verification match
   */
  checkForErrors(): void {
    const inputs = { ...this.state.inputValues };
    let formError = false;

    if (this.state.inputsToVerify !== null) {

      // need to check that all values contain something
      Object.keys(inputs).map((input) => {

        // Need to match any inputs that need verification
        if (this.state.inputsToVerify.includes(input + '-verify')) {
          if (inputs[ input ].content !== inputs[ input + '-verify' ].content) {
            formError = true;
            this.handleVerificationError(true, 'Does not match', input);
          } else {
            this.handleVerificationError(false, '', input);
          }
        }
      });
    }

    if (formError === false) {
      this.submitForm();
    }

  }

  /**
   * Creates and sends a key-value pair object to the onSubmitCB given as props
   * @property name - Is the id given as the input id in the props, the value is what the user typed in the form
   */
  submitForm(): void {
    const formObject: FormObject = {};

    for (const input in this.state.inputValues) {
      if (this.state.inputValues.hasOwnProperty(input)) {
        formObject[ input ] = this.state.inputValues[ input ].content;
      }
    }

    // TODO check to see if there is files that were uploaded
    if (Object.keys(this.filesArray).length > 0) {
      Object.keys(this.filesArray).map((file) => {
        formObject[ file ] = this.filesArray[ file ].files[ 0 ];
      });
    }
    this.props.onSubmitCB(formObject);
  }

  handleSubmit(event) {
    (event as Event).preventDefault();
    this.checkForErrors();
  }

  createFileInput(input, index, iID): JSX.Element {
    return (
      <div
        className={this.state.inputValues[ iID ].SF_error === true ? 'job-form-group error' : 'job-form-group'}
        key={`${index}${iID}`}
      >
        <label htmlFor={iID}>{input.label}</label>
        <input
          required={input.required}
          placeholder={input.placeHolder}
          id={iID}
          name={input.name}
          ref={(ref: HTMLInputElement) => this.filesArray[ iID ] = ref}
          accept={input.accept}
          type={input.type}
        />
        {this.state.inputValues[ iID ].SF_error === true ? <div className="input-error-box">{this.state.inputValues[ iID ].SF_errorMessage}</div> : null}
      </div>
    );
  }

  createJointInputs(inputs: JSX.Element[]): JSX.Element[] {
    const inputPerRow: number = 2;
    const totalInputs: number = inputs.length;
    const adjustArray: any[] = [];

    for (let i = 0; i < totalInputs; i + 1) {
      adjustArray.push(
        <div key={`${i}joinedinput`} className={'joined-row'}>
          {inputs[ i ]}
          {inputs[ i + 1 ]}
        </div>,
      );
      i = i + inputPerRow;
    }
    return adjustArray;
  }

  createInputs(): JSX.Element[ ] {
    const inputElements = this.props.inputs.map((input, index) => {

      // inputID
      const iID = input.id;

      if (input.type === 'file') {
        return this.createFileInput(input, index, iID);
      }

      return (
        <SimpleFormInput
          iID={iID}
          input={input}
          index={index}
          key={`${index}${iID}`}
          changeCB={this.handleChange}
          inputValues={this.state.inputValues}
        />
      );
    });

    if (this.props.joined === true) {
      return this.createJointInputs(inputElements);
    }

    return inputElements;
  }

  render() {
    return (
      <div className="simple-form" style={this.props.style}>
        <form action="" onSubmit={this.handleSubmit}>
          <h1>{this.props.header}</h1>
          <div>{this.createInputs()}</div>
          {this.props.cancelButton ? < input type={'button'} className="btn-standard" onClick={this.props.cancelButton.click} value={this.props.cancelButton.btnText} /> : null}
          <button className="btn-standard">Submit</button>
        </form>
        {/*<div className="form-error-box">Erorr: Please see errors above.</div>*/}
      </div>
    );
  }
}

export default SimpleForm;
