import * as React from 'react';

import { Company } from '../../../types/index';
import { IMG_URL, LOCAL_URL } from '../../../utils/utils';
import { default as Fade } from '../../animations/Fade';
import OtherJobsComponent from './OtherJobsComponent';
import SocialMediaComponent from './SocialMediaComponent';

/**
 * Styles
 */
import '../styles/JobPostCompanyInfo.scss';

interface MyProps {
  isFetching: boolean;
    company: any;
  loadJob?: (arg: any) => (any);
  currentJob?: string;
}

class JobPostCompanyInfoComponent extends React.Component<MyProps, any> {
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
    if (this.props.company === undefined) {
      return null;
    }

    const company: Company = this.props.company;
    let logo: string = `${LOCAL_URL}${require('../../../../images/icon/no-icon.svg')}`;
    if (company.logoImg !== null) {
      if (company.logoImg.length > 0) {
        logo = `${company.logoImg}`;
      }
    }

    return (
      <aside className="jp-company-aside">
        <img className="company-logo panel-shadow" src={logo} alt={`${company.name} Logo`}/>
        <div className="info-container panel-shadow" id="about-section">
          <h2 className="title">About {company.name}</h2>
          <p className="jp-company-location">{`${company.address.city}, ${company.address.state}`}</p>
        </div>
        <SocialMediaComponent company={company}/>
        <OtherJobsComponent company={company} handleClick={this.handleClick} currentJob={this.props.currentJob} isFetching={this.props.isFetching}/>
      </aside>
    );
  }
}

export default JobPostCompanyInfoComponent;
