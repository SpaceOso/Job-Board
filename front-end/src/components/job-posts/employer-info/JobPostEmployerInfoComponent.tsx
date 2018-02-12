import * as React from 'react';

import { Employer } from '../../../types/index';
import { IMG_URL, LOCAL_URL } from '../../../utils/utils';
import { default as Fade } from '../../animations/Fade';
import OtherJobsComponent from './OtherJobsComponent';
import SocialMediaComponent from './SocialMediaComponent';

/**
 * Styles
 */
import '../styles/JobPostEmployerInfo.scss';

interface MyProps {
  isFetching: boolean;
  employer: any;
  loadJob?: (arg: any) => (any);
  currentJob?: string;
}

class JobPostEmployerInfoComponent extends React.Component<MyProps, any> {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(jobId) {
    console.log('JOB ID:', jobId);
    if (this.props.loadJob !== undefined) {
      this.props.loadJob(jobId);
    }
  }

  render() {
    if (this.props.employer === undefined) {
      return null;
    }

    const employer: Employer = this.props.employer;
    let logo: string = `${LOCAL_URL}${require('../../../../images/icon/no-icon.svg')}`;
    if (employer.logoImg !== null) {
      if (employer.logoImg.length > 0) {
        logo = `${IMG_URL}${employer.logoImg}`;
      }
    }

    return (
      <aside className="jp-employer-aside">
        <img className="company-logo panel-shadow" src={logo} alt={`${employer.name} Logo`}/>
        <div className="info-container panel-shadow" id="about-section">
          <h1 className="title">About {employer.name}</h1>
          <p className="jp-employer-location">{`${employer.location.city}, ${employer.location.state}`}</p>
        </div>
        <SocialMediaComponent employer={employer}/>
        <OtherJobsComponent employer={employer} handleClick={this.handleClick} currentJob={this.props.currentJob} isFetching={this.props.isFetching}/>
      </aside>
    );
  }
}

export default JobPostEmployerInfoComponent;
