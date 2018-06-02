import * as React from 'react';

import './SimpleForm.scss';
import SimpleFormInput from './SimpleFormInput';
import TextField from "@material-ui/core/es/TextField";
import {map} from "tinymce";

export interface SFInput {
  label?: string;
  required?: boolean;
  type?: string;
  name?: string;
  accept?: string;
  placeHolder?: string;
  id?: string;
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
      // let localObj: Array<Array<FormObject>> = [];
    // let propObj: Array<FormObject> = [];
    let propObj: FormObject = {};
    let localObj: any = [];
    localObj = this.props.inputs;

    localObj.forEach((input, index) => {
      input.forEach((singleInput, index2) => {

        return propObj[singleInput.id] = {
          ...singleInput,
          content: '',
          groupId: index,
          SF_error: false,
          SF_errorMessage: '',
        }

        /*return propObj.push({
          [singleInput.id]: {
            ...singleInput,
            content: '',
            groupId: index,
            SF_error: false,
            SF_errorMessage: '',
          }
        });*/

      });
    });

    console.log("the built state object: ", propObj);

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
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("getDrivedStateFromProps(): ", nextProps);
  }

  /**
   *
   * @param {string} key
   * @param event
   */
  handleChange(key, id, event): any {
    console.log("SF: key: ", key);
    console.log("SF: id: ", id);
    console.log("SF: event: ", event);
    const keyObject = [...this.state.inputValues];
    console.log("state:, ", keyObject);

    keyObject[id].content = event;

    this.setState({inputValues: keyObject});
  }

  /**
   * Will either add or remove the SF_error and error message
   * @param {boolean} setError - Removes or adds error and message
   * @param {string} message - The message readout when displaying an error
   * @param {string} inputId - The indexed id of the input we want to alter
   */
  handleVerificationError(setError: boolean, message: string, inputId: string) {
    const inputRef = {...this.state.inputValues};
    console.log("what are the inpurRefs?: ", inputRef);
    if (setError === true) {
      inputRef[inputId].error = true;
      // inputRef[ inputId + '-verify' ].SF_error = true;
      // inputRef[ inputId + '-verify' ].SF_errorMessage = message;
    } else if (setError === false) {
      inputRef[inputId + '-verify'].SF_error = false;
      inputRef[inputId + '-verify'].SF_errorMessage = message;
    }

    this.setState({inputValues: {...inputRef}});
  }

  /**
   * Runs when form is submitted.
   * Checks if any two items that need verification match
   */
  checkForErrors(): void {
    console.log("checkForErrors");
    const inputs = {...this.state.inputValues};
    let formError = false;

    if (this.state.inputsToVerify !== null) {

      // need to check that all values contain something
      Object.keys(inputs).map((input) => {

        // Need to match any inputs that need verification
        if (this.state.inputsToVerify.includes(input + '-verify')) {
          console.log("We have iputs to check")
          if (inputs[input].content !== inputs[input + '-verify'].content) {
            console.log("We did find an error");
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
    console.log("The event is being fired: ", event);
    (event as Event).preventDefault();
    this.checkForErrors();
  }

  createFileInput(input, index, iID): JSX.Element {
    return (
      <div
        className={this.state.inputValues[iID].SF_error === true ? 'job-form-group error' : 'job-form-group'}
        key={`${index}${iID}`}
      >
        <TextField
          id={iID}
          label={input.label}
          placeholder={input.placeHolder}
          required={input.required}
          type={input.type}
          autoComplete="off"
          onChange={(event) => this.handleChange(this.state, iID, event)}
          margin="normal"
        />
        {this.state.inputValues[iID].SF_error === true ?
          <div className="input-error-box">{this.state.inputValues[iID].SF_errorMessage}</div> : null}
      </div>
    );
  }

  createJointInputs(inputsfe): JSX.Element[] | null{
    console.log("createJointInputs() : ", inputsfe);
    let inputElements: JSX.Element[][] = [];
    let testArr: any = [];

    Object.keys(inputsfe).forEach((input) => {
      console.log("current input: ", input);
      if(testArr[inputsfe[input].groupId] === undefined){
        testArr[inputsfe[input].groupId] = [];
        testArr[inputsfe[input].groupId].push(inputsfe[input]);
      } else {
        testArr[inputsfe[input].groupId].push(inputsfe[input]);
      }
    });

    console.log("inputElements created: ", testArr);

    // returning this itself will gives a list
    const inputsCreated: any = testArr.map((chunkedInputs, index) => {
      console.log("inside creating joints with: ", chunkedInputs);
      console.log("inside creating joints with: ", index);
      return chunkedInputs.map((singleInput, index) => {
        return this.createSingleInput(singleInput, index)
      })
    });

    console.log("tester you", inputsCreated);

    return inputsCreated.map((inputChunk, index) =>{
      return (
        <div className='joined-row' key={index + 1}>
        {inputChunk}
      </div>
      )
    });

   /* return (
      <div className='joined-row' key={index + 1}>
        {inputsCreated}
      </div>*/
    // )
  }

  createSingleInput(input: any, index: number): JSX.Element {
    console.log("creatingSingleInput(): ", input);
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
        autoComplete="off"
        key={`${index}${iID}`}
        onChange={(event) => this.handleChange(this.state, iID, event.target.value)}
        margin="normal"
      />
    );
  }

  createInputs(): Array<JSX.Element> {
    let inputElements: JSX.Element[] = [];
    let singleArray = this.state.inputValues as SF_Object[];

    // need to check to see if we have grouped sections
    if (this.props.joined) {
      inputElements = this.createJointInputs(this.state.inputValues);
    } else {
      inputElements = singleArray.map((input, index) => {

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
            autoComplete="off"
            key={`${index}${iID}`}
            onChange={(event) => this.handleChange(this.state, iID, event.target.value)}
            margin="normal"
          />
        );
      });
    }

    return inputElements;
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
