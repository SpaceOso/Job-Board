import * as React from 'react';
import { EmployerJobView } from '../../../../types';
import DataTable from '../../../data-table/DataTable';

// styles
import './JobPostUpdatesComponent.scss';

interface IProps {
  jobs: EmployerJobView[];
}

class JobPostUpdatesComponent extends React.Component<IProps, {}> {

  constructor(props) {
    super(props);

    this.createList = this.createList.bind(this);
    this.handleJobClick = this.handleJobClick.bind(this);
  }

  handleJobClick(event) {
    console.log('job has been clicked', event);
  }

  createList() {
    if (this.props.jobs === null || this.props.jobs === undefined || this.props.jobs.length <= 0) {
      return this.createEmptyMessageComponent();
    }
    const dataInfo = [
      {
        property: 'title',
        header: 'Title',
      },
      {
        join: true,
        property: 'city',
        properties: [ 'location.city', 'location.state' ],
        connector: ', ',
        header: 'Location',
      },
      {
        property: 'Applicants',
        special: 'count',
        header: 'Applicants',
      },
    ];
    return (
      <DataTable rowData={this.props.jobs} columnInfo={dataInfo} handleClick={this.handleJobClick} totalRows={5} specialClasses={null} itemId={'2343'}/>
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
    return (
      <div className={'job-post-updates-container'}>
        <h1>Job Post Updates</h1>
        <div className={'job-post-updates'}>
          {this.createList()}
        </div>
      </div>
    );
  }
}

export default JobPostUpdatesComponent;
