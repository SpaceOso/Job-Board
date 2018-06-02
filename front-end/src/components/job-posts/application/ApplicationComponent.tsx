import * as React from 'react';

import ModalComponent from '../../modal/ModalComponent';
import SimpleForm, {SFInput} from '../../simple-form/SimpleForm';
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
  private locationInputs: SFInput[][] = [
    [
      {
        label: 'First Name',
        required: true,
        type: 'text',
        placeHolder: 'First Name',
        errorText: "First Name Please!",
        id: 'firstName',
      },
      {
        label: 'Last Name',
        required: true,
        type: 'text',
        placeHolder: 'Last Name',
        errorText: "Last Name Please!",
        id: 'lastName',
      },
    ],
    [
      {
        label: 'email',
        required: true,
        type: 'text',
        placeHolder: 'email',
        errorText: "Enter email please!",
        id: 'email',
      },
      {
        label: 'Phone Number',
        required: true,
        type: 'tel',
        placeHolder: '555-555-555',
        errorText: "Enter phone number please!",
        id: 'phoneNumber',
      },
    ],
    [
      {
        label: 'Portfolio Site',
        required: false,
        type: 'text',
        placeHolder: 'www.yourportfolio.com',
        errorText: "Portfolio link please!",
        id: 'website',
      },
    ],
    [
      {
        label: 'Resume',
        required: true,
        type: 'file',
        name: 'resume',
        accept: '.pdf',
        placeHolder: 'Resume',
        errorText: "Upload your resume home-boy!",
        id: 'resumeFile',
      },
    ],
    [
      {
        label: 'Cover Letter',
        required: false,
        type: 'file',
        accept: '.pdf',
        placeHolder: 'Cover Letter',
        errorText: "Error! What happened?! Try again!",
        id: 'coverLetterFile',
      },
    ],
  ];

  constructor(props) {
    super(props);

    this.handleApplicationSubmit = this.handleApplicationSubmit.bind(this);
  }

  handleApplicationSubmit(data) {

    console.log("Adding application submition here: ", data);

    /*We only get the info from the form here. We need to add the company and jobId info to this.*/

    let applicant : Applicants = {...data};
    applicant.coverLetter = data.resumeFile.name;
    applicant.resume = data.resumeFile.name;

    let applicantDTO = {
      applicant,
      jobId: this.props.jobId,
      resumeFile: data.resumeFile !== undefined ? data.resumeFile.name : null,
      coverLetterFile: data.coverLetterFile !== undefined ? data.coverLetterFile.name : null,
    };

    this.props.handleApplicantInfo(applicantDTO);
  }

  render() {
    const cancelButton = {
      click: this.props.cancelApplication,
      btnText: 'Cancel',
    };

    const formStyles = {
      width: '29%',
      maxWidth: '450px',
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
            style={formStyles}
            cancelButton={cancelButton}
          />
        </div>
      </ModalComponent>
    );
  }
}

export default ApplicationComponent;
