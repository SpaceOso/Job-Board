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
  currentJob: CompanyJobView | null;
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

    this.onClick = this.onClick.bind(this);
    this.handleJobSelectionChange = this.handleJobSelectionChange.bind(this);
    this.displayJobDropDown = this.displayJobDropDown.bind(this);
  }

  componentDidMount() {
    if (this.props.jobs !== null && Object.keys(this.props.jobs).length > 0) {
      // adds the first jobPost to state
      // let jobList = Object.keys(this.props.jobs);
      const currentJob = this.props.jobs[0];
      console.log("state applicant list will be: ", this.props.company.applicantList[currentJob.id]);
      this.setState({
        currentJob: {...currentJob},
        applicantList: this.props.company.applicantList[currentJob.id],
      });
    }
  }

  createList() {
    if (this.state.currentJob !== null) {
      console.log('new list created with jobPost:', this.state.currentJob.title);
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
        properties: ['firstName', 'lastName'],
        header: 'Name',
      },
      {
        property: 'email',
        header: 'Email',
      },
      {
        property: 'status',
        header: 'Status',
      },
      {
        property: 'interest',
        header: 'Interest',
      },
    ];

    if (this.state.currentJob === null) {
      return (
        <div>
          Sorry you don't have any jobs to display applicants for.
        </div>
      );
    }

    if (this.state.applicantList.length <= 0) {
      return (
        <div>
          Sorry your current job doesn't have any applicants
        </div>
      );
    }
    return (
      <div>
        <h1>Candidates for {this.state.currentJob.title} - {this.state.currentJob.address.city}</h1>
        <DataTable
          rowData={this.state.applicantList}
          specialClasses={specialClasses}
          columnInfo={dataInfo}
          handleClick={this.onClick}
          totalRows={5}
          itemId={this.state.currentJob.id}
        />
      </div>
    );
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
        <div>
          Currently viewing applicants for job:
          <DropDownComponent
            list={this.props.jobs}
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
