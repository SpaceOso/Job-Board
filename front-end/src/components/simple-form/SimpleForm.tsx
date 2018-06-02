import * as React from 'react';

import './SimpleForm.scss';
import SimpleFormInput from './SimpleFormInput';
import TextField from "@material-ui/core/es/TextField";
import Button from '@material-ui/core/Button';
import {map} from "tinymce";

export interface SFInput {
  label?: string;
  required?: boolean;
  type?: string;
  name?: string;
  accept?: string;
  placeHolder?: string;
  id?: string;
  errorText?: string,
}

export interface SF_Object extends SFInput {
  content: string,
  SF_error: false,
  SF_errorMessage: '',
  groupId: number,
}

interface FormObject {
  [key: string]: SF_Object;
}

interface FormObjectArr {
  [key: number]: Array<FormObject>;
}

interface MyProps {
  header: string;
  inputs: Array<SFInput> | Array<Array<SFInput>>;
  submitBtnText: string;
  verifyInputs: string[] | null;
  onSubmitCB: (any) => void;
  joined?: boolean;
  style?: {};
  cancelButton?: { click: (e: React.FormEvent<HTMLInputElement>) => void, btnText: string };
}

interface myState {
  inputs: Array<SFInput>;
}

class SimpleForm extends React.Component<MyProps, any> {
  private filesArray: any = {};

  constructor(props) {
    super(props);
    // let propObj: any = {};
    // let propObj:Array<SF_Object> | Array<Array<FormObject>> | null = null;

    /**
     * Crate an object for each input to hold the employee input and to know if there is an
     * error associated with that input.
     */
    let propObj: FormObject = {};
    let localObj = this.props.inputs as SFInput[][];

    localObj.forEach((input, index) => {
      input.forEach((singleInput, index2) => {

        return propObj[singleInput.id] = {
          ...singleInput,
          content: '',
          groupId: index,
          SF_error: false,
          SF_errorMessage: '',
        }

      });
    });


    this.state = {
      inputsToVerify: this.props.verifyInputs !== null ? this.props.verifyInputs.map(input => input + '-verify') : null,
      formSubmitted: false,
      formErrors: false,
      inputValues: {...propObj},
    };


    this.createInputs = this.createInputs.bind(this);
    this.createFileInput = this.createFileInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createSingleInput = this.createSingleInput.bind(this);
    this.handleFileInputChange = this.handleFileInputChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
  }

  /**
   *
   * @param {string} key
   * @param event
   */
  handleChange(key, id, event): any {
    const keyObject = {...this.state.inputValues};

    console.log("key ", key);
    console.log("id ", id);
    console.log("event", event);

    if (keyObject[id].type === "logo") {
      console.log("we clicked on a logo");

    }

    keyObject[id].content = event;

    this.setState({inputValues: keyObject});
  }

  handleFileInputChange = (e: React.FormEvent<HTMLInputElement>, id) => {
    console.log("handle file change: ", e.currentTarget.value);
    // this.props.changeCB(this.props.iID, e.currentTarget.value);

  };

  /**
   * Will either add or remove the SF_error and error message
   * @param {boolean} setError - Removes or adds error and message
   * @param {string} message - The message readout when displaying an error
   * @param {string} inputId - The indexed id of the input we want to alter
   */
  handleVerificationError(setError: boolean, message: string, inputId: string) {
    const inputRef = {...this.state.inputValues};

    if (setError === true) {
      inputRef[inputId].SF_error = true;
      inputRef[inputId].errorMessage = inputRef[inputId].errorText;
    } else if (setError === false) {
      inputRef[inputId].SF_error = false;
      inputRef[inputId].errorMessage = null;
    }

    this.setState({inputValues: {...inputRef}});
  }

  /**
   * Runs when form is submitted.
   * Checks if any two items that need verification match
   */
  checkForErrors(): void {
    const inputs = {...this.state.inputValues};
    let formError = false;

    // need to check that all required inputs are there
    Object.keys(inputs).map((input) => {
      // Need to match any inputs that need verification
      if (inputs[input].required) {
        console.log("this was required ", input);
        console.log(inputs[input]);
        if(inputs[input].content.length <= 0){
          console.log("we failed on : ", input);
          this.handleVerificationError(true, 'Does not match', input);
          formError = true;
        } else {
          formError = false;
          this.handleVerificationError(false, '', input);
        }
      }
    });

    if (this.state.inputsToVerify !== null) {

      // need to check that all values contain something
      Object.keys(inputs).map((input) => {

        // Need to match any inputs that need verification
        if (this.state.inputsToVerify.includes(input + '-verify')) {
          if (inputs[input].content !== inputs[input + '-verify'].content) {
            formError = true;
            this.handleVerificationError(true, 'Does not match', input + '-verify');
          } else {
            this.handleVerificationError(false, '', input + '-verify');
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
   * @property name - Is the id given as the input id in the props, the value is what the employee typed in the form
   */
  submitForm(): void {
    const formObject: FormObject = {};

    for (const input in this.state.inputValues) {
      if (this.state.inputValues.hasOwnProperty(input)) {
        formObject[input] = this.state.inputValues[input].content;
      }
    }

    // TODO check to see if there is files that were uploaded
    if (Object.keys(this.filesArray).length > 0) {
      Object.keys(this.filesArray).map((file) => {
        formObject[file] = this.filesArray[file].files[0];
      });
    }
    this.props.onSubmitCB(formObject);
  }

  handleSubmit(event) {
    (event as Event).preventDefault();
    this.checkForErrors();
  }

  createFileInput(input, index, iID): JSX.Element {

    const errorMessage = <p>You need a resume!</p>;
    let fileName: string;

    if(this.filesArray[iID] !== undefined && this.filesArray[iID].files[0] !== undefined){
      fileName = this.filesArray[iID].files[0].name;
    }
    console.log("file input: ", this.filesArray);

    return (
      <div className="file-input-container"
        key={`${index}${iID}`}>

        <input
          accept={input.accept}
          id={iID}
          className="no-input"
          multiple
          ref={(ref: HTMLInputElement) => this.filesArray[iID] = ref}
          type="file"
          onChange={(event) => this.handleChange(this.state, iID, event)}
        />
        <label htmlFor={iID}>
          <Button
            variant="raised"
            component="span"
            color={input.SF_error ? 'secondary' : 'primary'}
          >
            {input.placeHolder}
          </Button>
        {input.SF_error ? errorMessage : null}
        </label>
        {fileName !== undefined ? <p>{fileName}</p> : null}
      </div>
    )

  }

  createJointInputs(inputGroups): JSX.Element[] | null {
    let testArr: any = [];

    /* Checks to see if an array with that groupId is created
    * if not it creates the array and inserts an element with the the same groupId*/
    Object.keys(inputGroups).forEach((input) => {
      const groupId: number = inputGroups[input].groupId;

      if (testArr[groupId] === undefined) {
        testArr[groupId] = [];
        testArr[groupId].push(inputGroups[input]);
      } else {
        testArr[groupId].push(inputGroups[input]);
      }

    });

    // returning this itself will gives a list
    const inputsCreated: any = testArr.map((chunkedInputs) => {
      return chunkedInputs.map((singleInput, index) => {
        return this.createSingleInput(singleInput, index)
      })
    });

    if (!this.props.joined) {
      return inputsCreated;
    }

    return inputsCreated.map((inputChunk, index) => {
      return (
        <div className='joined-row' key={index + 1}>
          {inputChunk}
        </div>
      )
    });
  }

  createSingleInput(input: any, index: number): JSX.Element {
    // inputID
    const iID = input.id;

    if (input.type === 'file') {
      return this.createFileInput(input, index, iID);
    }

    return (
      <TextField
        id={iID}
        label={input.label}
        placeholder={input.placeHolder}
        required={input.required}
        type={input.type}
        error={input.SF_error}
        helperText={input.errorMessage}
        autoComplete="off"
        key={`${index}${iID}`}
        onChange={(event) => this.handleChange(this.state, iID, event.target.value)}
        margin="normal"
      />
    );
  }

  createInputs(): Array<JSX.Element> {
    return this.createJointInputs(this.state.inputValues);
  }

  render() {
    return (
      <div className="simple-form" style={this.props.style}>
        <form action="" onSubmit={this.handleSubmit}>
          <h1>{this.props.header}</h1>
          <div className={"input-container"}>
            {this.createInputs()}
          </div>
          {this.props.cancelButton ?
            < input type={'button'} className="btn-standard" onClick={this.props.cancelButton.click}
                    value={this.props.cancelButton.btnText}/> : null}
          <button className="btn-standard">Submit</button>
        </form>
        {/*<div className="form-error-box">Erorr: Please see errors above.</div>*/}
      </div>
    );
  }
}

export default SimpleForm;
