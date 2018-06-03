import * as React from 'react';
import {Company, CompanyJobView, Job, PrivateJobView} from '../../../../types';
import SpinnerComponent from '../../../spinners/spinnerComponent';
import DataTable from '../../../data-table/DataTable';

// styles
import './JobPostUpdatesComponent.scss';

interface IProps {
  jobs: Job[];
  company: Company;
}

class JobPostUpdatesComponent extends React.Component<IProps, {}> {

  constructor(props) {
    super(props);

    console.log("the props that we get for the jobpost update: ", this.props);
    this.createList = this.createList.bind(this);
    this.handleJobClick = this.handleJobClick.bind(this);
  }

  handleJobClick(event) {
    console.log('jobPost has been clicked', event);
  }

  createList() {
    console.log("CREATING LISTS");
    if (this.props.jobs === null || this.props.jobs === undefined || this.props.jobs.length <= 0) {
      return this.createEmptyMessageComponent();
    }
    console.log("the jobs we're using to make a list: ", this.props.jobs);

    let jobObjects: PrivateJobView[] = [...this.props.jobs];

    jobObjects.forEach(job =>{
      console.log(job);
      job.applicants = this.props.company.applicantList[job.id];
    });

    const dataInfo = [
      {
        property: 'title',
        header: 'Title',
      },
      {
        join: true,
        property: 'city',
        properties: [ 'address.city', 'address.state' ],
        connector: ', ',
        header: 'Location',
      },
      {
        property: 'applicants',
        special: 'count',
        header: 'Applicants',
      },
    ];
    return (
      <DataTable
        rowData={jobObjects}
        columnInfo={dataInfo}
        handleClick={this.handleJobClick}
        totalRows={5}
        specialClasses={null}
        itemId={'2343'}
      />
    );
  }

  createEmptyMessageComponent() {
    return (
      <div>
        Once you have jobs you will see them posted here.
      </div>
    );
  }

  render() {

    if(this.props.company.isFetching){
      console.log("company is fetching..")
      return <SpinnerComponent />
    }

    return (
      <div className={'jobPost-post-updates-container'}>
        <h2>Job Post Updates</h2>
        <div className={'jobPost-post-updates'}>
          {this.createList()}
        </div>
      </div>
    );
  }
}

export default JobPostUpdatesComponent;
