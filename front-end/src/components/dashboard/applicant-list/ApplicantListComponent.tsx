import * as React from 'react';
import { Company, CompanyJobView, Employee } from '../../../types/index';
import DataTable from '../../data-table/DataTable';

// styles
import { Redirect, RouteComponentProps } from 'react-router';
import DropDownComponent from '../../drop-down/DropDownComponent';
import './ApplicantListComponent.scss';

interface MyProps extends RouteComponentProps<any> {
  employee: Employee;
  jobs: CompanyJobView[] | null;
  company: Company;
  handleApplicantSelect: (applicant) => void;
}

interface MyState {
  jobs: CompanyJobView[] | null;
  currentJob: string | CompanyJobView;
  jobList: null;
  applicant: any;
  applicantList: any;
}

class ApplicantListComponent extends React.Component<MyProps, MyState> {
  state: MyState = {
    jobs: this.props.jobs,
    jobList: null,
    currentJob: null,
    applicant: null,
    applicantList: null,
  };

  constructor(props) {
    super(props);

    console.log("props given to applicantList: ", this.props);
    this.onClick = this.onClick.bind(this);
    this.handleJobSelectionChange = this.handleJobSelectionChange.bind(this);
    this.displayJobDropDown = this.displayJobDropDown.bind(this);
    this.returnNoApplicantComponent = this.returnNoApplicantComponent.bind(this);
  }

  componentDidMount() {
    if (this.props.jobs !== null && Object.keys(this.props.jobs).length > 0) {
      // adds the first jobPost to state
      // let jobList = Object.keys(this.props.jobs);
      const currentJob = this.props.jobs[0];
      console.log("state applicant list will be: ", this.props.company.applicantList[currentJob.id]);
      this.setState({
        currentJob: '-',
        // currentJob: {...currentJob},
        applicantList: this.props.company.applicantList[currentJob.id],
      });
    }
  }

  createList() {
    const currentJob = this.state.currentJob as CompanyJobView;

    if (currentJob !== null) {
      console.log('new list created with jobPost:', currentJob.title );
    }
    const specialClasses = {
      Interested: 'interested',
      'Needs Review': 'needsReview',
      Maybe: 'maybe',
      'No Interest': 'noInterest',
    };

    const dataInfo = [
      {
        join: true,
        property: 'firstName',
        properties: ['applicant.firstName', 'applicant.lastName'],
        header: 'Name',
      },
      {
        property: 'email',
        join: true,
        properties: ['applicant.email'],
        header: 'Email',
      },
      {
        property: 'review',
        defaultValue: "Needs Review",
        header: 'Reviewed',
      },
      {
        property: 'status',
        defaultValue: "Needs Review",
        header: 'Status',
      },
    ];

    if (this.state.currentJob === null || this.state.applicantList.length <= 0) {
      return this.returnNoApplicantComponent("No one has applied to this job yet! Maybe you should promote* it?");
    }

    if(this.state.currentJob === '-'){
      return this.returnNoApplicantComponent("Please select a job from the dropdown above");
    }

    return (
      <div>
        <h1>Candidates for {currentJob.title} - {currentJob.address.city}</h1>
        <DataTable
          rowData={this.state.applicantList}
          specialClasses={specialClasses}
          columnInfo={dataInfo}
          handleClick={this.onClick}
          totalRows={5}
          itemId={currentJob.id}
        />
      </div>
    );
  }


  returnNoApplicantComponent = (message) =>{
    return(
      <div className='no-applicants'>
        <h2>{message}</h2>
      </div>
    )
  }

  onClick(selectedApplicant) {
    console.log('selectedApplicant', selectedApplicant);
    this.setState({ applicant: selectedApplicant });
    this.props.handleApplicantSelect(selectedApplicant);
  }

  handleJobSelectionChange(jobId) {
    if (this.props.jobs !== null) {
      this.props.jobs.forEach((job) => {
        if (job.id === jobId) {
          this.setState({
            currentJob: job,
            applicantList: this.props.company.applicantList[job.id]
          });
        }
      });
    }
  }

  displayJobDropDown() {
    if (this.props.jobs !== null) {
      return (
        <div className='applicant-drop-down-container'>
          <h2>Currently viewing applicants for job:</h2>
          <DropDownComponent
            list={this.props.jobs}
            defaultValue={this.props.jobs[0]}
            helperText={'Job Details:'}
            listName={'jobPost-select'}
            onChangeCB={this.handleJobSelectionChange}
          />
        </div>
      );
    }
  }

  render() {

    return (
      <div className="dashboard-applicant-section">
        {this.props.jobs !== null ? this.displayJobDropDown() : null}
        {this.createList()}
        {this.state.applicant !== null ? <Redirect to={`${this.props.match.url}/${this.state.applicant.id}`}/> : null}
      </div>
    );
  }
}

export default ApplicantListComponent;
