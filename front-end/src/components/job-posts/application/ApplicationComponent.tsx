import * as React from 'react';

import ModalComponent from '../../modal/ModalComponent';
import SimpleForm from '../../simple-form/SimpleForm';
import {Applicants} from "../../../types";

interface MyProps {
  jobId: string | null;
  jobTitle: string;
  companyId: string | null;
  handleApplicantInfo: (applicantInfo) => {};
  cancelApplication: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  viewingApplication: boolean;
}

class ApplicationComponent extends React.Component<MyProps> {
  private locationInputs = [
    {
      label: 'First Name',
      required: true,
      type: 'text',
      placeHolder: 'First Name',
      id: 'firstName',
    },
    {
      label: 'Last Name',
      required: true,
      type: 'text',
      placeHolder: 'Last Name',
      id: 'lastName',
    },
    {
      label: 'email',
      required: true,
      type: 'text',
      placeHolder: 'email',
      id: 'email',
    },
    {
      label: 'Phone Number',
      required: true,
      type: 'tel',
      placeHolder: '555-555-555',
      id: 'phoneNumber',
    },
    {
      label: 'website',
      required: false,
      type: 'text',
      placeHolder: 'www.yourwebsite.com',
      id: 'website',
    },
    {
      label: 'Resume',
      required: true,
      type: 'file',
      name: 'resume',
      accept: '.pdf',
      placeHolder: 'upload your resume',
      id: 'resumeFile',
    },
    {
      label: 'Cover Letter',
      required: false,
      type: 'file',
      accept: '.pdf',
      placeHolder: 'upload your resume',
      id: 'coverLetterFile',
    },
  ];

  constructor(props) {
    super(props);

    this.handleApplicationSubmit = this.handleApplicationSubmit.bind(this);
  }

  handleApplicationSubmit(data) {

    console.log("Adding application submition here: ", data);

    /*We only get the info from the form here. We need to add the company and jobId info to this.*/

    let applicantDAO = {
      applicant: data,
      resume: data.resumeFile !== undefined ? data.resumeFile.name : null,
      coverLetter: data.coverLetterFile !== undefined ? data.coverLetterFile.name : null,
      jobId: this.props.jobId,
    };

    this.props.handleApplicantInfo(applicantDAO);
  }

  render() {
    const cancelButton = {
      click: this.props.cancelApplication,
      btnText: 'Cancel',
    };

    return (
      <ModalComponent>
        <div className="modal">
          <SimpleForm
            header={`Apply to ${this.props.jobTitle}`}
            inputs={this.locationInputs}
            submitBtnText={'Submit Application'}
            verifyInputs={null}
            onSubmitCB={this.handleApplicationSubmit}
            joined={true}
            style={{ width: 'auto' }}
            cancelButton={cancelButton}
          />
        </div>
      </ModalComponent>
    );
  }
}

export default ApplicationComponent;
