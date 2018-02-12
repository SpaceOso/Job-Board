import * as React from 'react';

interface MyProps {
  iID: any;
  input: any;
  index: any;
  inputValues: any;
  changeCB: (key, event) => void;
}

class SimpleFormInput extends React.Component<MyProps> {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.props.changeCB(this.props.iID, e.currentTarget.value);
  }

  render() {
    return (
      <div
        className={this.props.iID.SF_error === true ? 'job-form-group error' : 'job-form-group'}
      >
        <label htmlFor={this.props.iID}>{this.props.input.label}</label>
        <input
          required={this.props.input.required}
          placeholder={this.props.input.placeHolder}
          id={this.props.iID}
          onChange={this.handleChange}
          type={this.props.input.type}
        />
        {this.props.inputValues[ this.props.iID ].SF_error === true ? <div className="input-error-box">{this.props.inputValues[ this.props.iID ].SF_errorMessage}</div> : null}
      </div>
    );
  }
}

export default SimpleFormInput;
