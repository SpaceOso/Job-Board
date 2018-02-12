import * as React from 'react';

// utils
import { setFormState } from '../../../../utils/utils';
import { default as SpinnerComponent } from '../../../spinners/spinnerComponent';
import TinymceComponent from '../../../tinymce/TinymceComponent';

import './CreateJobComponent.scss';

interface MyProps {
  submitJobPost;
  employer;
  userId;
}

interface MyState {
  title: string;
  description: string;
  city: string;
  state: string;
  zip: string;
  keywords: string[];
}

const initialState: MyState = {
  title: '',
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
    this.props.submitJobPost({ ...this.state, employerId: this.props.employer.id });
    event.preventDefault();
    this.setState(initialState);
  }

  handleChange(state, key, event) {
    this.setState(setFormState(state, key, event));
  }

  handleEditorChange = (e) => {
    // console.log('Content was updated:', e.target.getContent());
  }

  handleJobDescriptionChange(content) {
    const updatedContent = content.replace(/style="([^"]*)"/g, '');
    this.setState({ description: updatedContent });
  }

  render() {
    const spinner = (<SpinnerComponent/>);
    const form = (
      <div className={'create-job-component'}>
        <h1>Create a new job post</h1>
        <form onSubmit={this.handleJobSubmit}>
          <div>
            <label htmlFor="job-title">Job Title</label>
            <input
              type="text"
              required
              id="job-title"
              placeholder="Enter Job Title"
              value={this.state.title}
              onChange={(event) => this.handleChange(this.state, 'title', event.target.value)}
            />
            <div>
              <h3>Job Location</h3>
              <label htmlFor="job-city">City</label>
              <input
                type="text"
                required
                id="job-city"
                placeholder="Enter Job city"
                value={this.state.city}
                onChange={(event) => this.handleChange(this.state, 'city', event.target.value)}
              />
              <label htmlFor="job-city">State</label>
              <input
                type="text"
                required
                id="job-state"
                placeholder="Enter Job State"
                value={this.state.state}
                onChange={(event) => this.handleChange(this.state, 'state', event.target.value)}
              />
              <label htmlFor="job-city">Zip</label>
              <input
                type="text"
                required
                id="job-zip"
                placeholder="Enter Job Zip"
                value={this.state.zip}
                onChange={(event) => this.handleChange(this.state, 'zip', event.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="job-description">Job Description</label>
            <TinymceComponent
              id="job-create"
              onEditorChange={this.handleJobDescriptionChange}
              priorContent={null}
            />
          </div>
          <div>
            <label htmlFor="keywords">Enter keywords</label>
            <input
              type="text"
              required
              id="keywords"
              placeholder="Enter keywords"
              value={this.state.keywords}
              onChange={(event) => this.handleChange(this.state, 'keywords', event.target.value)}
            />
          </div>
          <button>Submit Job</button>
        </form>
      </div>
    );

    return (
      <div>
        {this.props.employer.isFetching ? spinner : form}
      </div>
    );
  }
}

export default CreateJobComponent;
