import * as React from 'react';
import { Employer, Job } from '../../../../types/index';
import DataTable from '../../../data-table/DataTable';
import EditJobComponent from './EditJobComponent';

// router
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router';
import './EditJobComponent.scss';

interface MyProps extends RouteComponentProps<any> {
  jobs;
  employer;
}

interface myState {
  selectedJob: Job | null;
  editingJob: boolean;
}

class EditJobsLayout extends React.Component<MyProps, myState> {
  constructor(props) {
    super(props);

    this.state = {
      selectedJob: null,
      editingJob: false,
    };

    this.onClick = this.onClick.bind(this);
    this.handleJobEdit = this.handleJobEdit.bind(this);
    this.handleJobDelete = this.handleJobDelete.bind(this);
  }

  onClick(selectedJob) {
    this.setState({
      selectedJob,
      editingJob: true,
    });
  }

  handleJobDelete() {
  }

  handleJobEdit() {
    this.setState({
      editingJob: true,
    });
  }

  render() {
    const dataInfo = [
      { property: 'title', header: 'Job Title' },
      { property: 'description', header: 'Job Description' },
    ];

    console.log('inside the edit layout with props: ', this.props);
    return (
      <div className="dashboard-edit-job-section">
        {this.state.editingJob === true ? <Redirect to={`${this.props.match.url}/editJob`}/> : null}
        <Switch>
          <Route
            exact={true}
            path={`${this.props.match.path}`}
            render={(props) => (
                   <div>
                     <h1>Click bellow to edit a job</h1>
                     <h1>Please Select a job</h1>
                     <DataTable
                       rowData={this.props.employer!.jobs}
                       columnInfo={dataInfo}
                       specialClasses={null}
                       handleClick={this.onClick}
                       totalRows={10}
                       itemId={this.props.employer.id}
                     />
                   </div>
                 )}
          />
          <Route
            path={`${this.props.match.url}/editJob`}
            render={(state) => (
                   <EditJobComponent
                     job={this.state.selectedJob}
                     {...this.props}
                   />
                 )}
          />
        </Switch>
      </div>
    );
  }
}

export default EditJobsLayout;