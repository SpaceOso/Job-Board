import * as React from 'react';

import { setFormState } from '../../../../utils/utils';
import { default as SpinnerComponent } from '../../../spinners/spinnerComponent';
import TinymceComponent from '../../../tinymce/TinymceComponent';
import Button from '@material-ui/core/Button';

import './CreateJobComponent.scss';
import {JobDTO} from "../../../../types";
import TextField from "@material-ui/core/TextField";

interface MyProps {
  submitJobPost;
  company;
  employeeId;
}

interface MyState {
  title: string;
  description: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  keywords: string[];
}

const initialState: MyState = {
  title: '',
  street: '',
  city: '',
  state: '',
  zip: '',
  description: '',
  keywords: [],
};

class CreateJobComponent extends React.Component<MyProps, MyState> {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleJobSubmit = this.handleJobSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleJobDescriptionChange = this.handleJobDescriptionChange.bind(this);
  }

  handleJobSubmit(event: any): void {

    console.log("handleJobSubmit()", event);

    const jobWrapper: JobDTO  = {
      job: {
        id: null,
        title: this.state.title,
        description: this.state.description,
        companyId: this.props.company.id,
        createdDate: null,
        address: {
          street: this.state.street,
          city: this.state.city,
          state: this.state.state,
          zipCode: this.state.zip
        }
      },
      companyId: this.props.company.id,
    };

    this.props.submitJobPost(jobWrapper);
    event.preventDefault();
    this.setState(initialState);
  }

  handleChange(state, key, event) {
    this.setState(setFormState(state, key, event));
  }

  handleEditorChange = (e) => {
    // console.log('Content was updated:', e.target.getContent());
  };

  handleJobDescriptionChange(content) {
    const updatedContent = content.replace(/style="([^"]*)"/g, '');
    this.setState({ description: updatedContent });
  }

  render() {
    const styles = {
      inputs: {
        margin: '0 10px'
      }
    };

    console.log("inputs: ", styles.inputs);
    const spinner = (<SpinnerComponent/>);
    const form = (
      <div className='create-job-component'>
        <h2 id='job-create-header'>Create a new job post</h2>
        <form onSubmit={this.handleJobSubmit}>
          <div>
            <TextField
              id="job-title"
              label="Job Title"
              placeholder="Enter Job Title"
              required
              onChange={(event) => this.handleChange(this.state, 'title', event.target.value)}
              margin="normal"
              style={styles.inputs}
            />
            <h2 id='job-location-header'>Job Location</h2>
            <div className='job-location-form'>
              <TextField
                id="job-street"
                label="Street Address"
                placeholder="Enter Street Address"
                required
                onChange={(event) => this.handleChange(this.state, 'street', event.target.value)}
                margin="normal"
                style={styles.inputs}
              />
              <TextField
                id="job-city"
                label="City"
                placeholder="Enter Job city"
                required
                onChange={(event) => this.handleChange(this.state, 'city', event.target.value)}
                margin="normal"
                style={styles.inputs}
              />
              <TextField
                id="job-state"
                label="State"
                placeholder="Enter Job State"
                required
                onChange={(event) => this.handleChange(this.state, 'state', event.target.value)}
                margin="normal"
                style={styles.inputs}
              />
              <TextField
                id="job-zip"
                label="Zip"
                placeholder="Enter Job Zip"
                required
                onChange={(event) => this.handleChange(this.state, 'zip', event.target.value)}
                margin="normal"
                style={styles.inputs}
              />
            </div>
          </div>
          <h2 id='description-header'>Job Description</h2>
          <div>
            <TinymceComponent
              id="job-create"
              onEditorChange={this.handleJobDescriptionChange}
              priorContent={null}
            />
          </div>
          <Button variant="raised" color="primary" type='submit' style={{margin: '10px'}}>
            Submit Job
          </Button>
        </form>
      </div>
    );

    return (
      <div>
        {this.props.company.isFetching ? spinner : form}
      </div>
    );
  }
}

export default CreateJobComponent;
