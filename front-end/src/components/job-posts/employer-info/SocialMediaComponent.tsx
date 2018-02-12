import * as React from 'react';
import { Employer } from '../../../types';
import { LOCAL_URL } from '../../../utils/utils';

interface MyProps {
  // TODO need to pass employer to get correct links
  employer: Employer;
}

function socialMediaComponent(props: MyProps) {

  let website: JSX.Element | null = null;
  let faceBook: JSX.Element | null = null;
  let twitter: JSX.Element | null = null;
  let linkedIn: JSX.Element | null = null;

  if (props.employer.website !== undefined) {
    website = (
      <li>
        <a href={`http://${props.employer.facebook}`} target="blank">
          <img src={`${LOCAL_URL}${require('../../../../images/icon/iconWeb.svg')}`}/>
        </a>
      </li>
    );
  }

  if (props.employer.facebook !== undefined) {
    faceBook = (
      <li>
        <a href={`http://${props.employer.facebook}`} target="blank">
          <img src={`${LOCAL_URL}${require('../../../../images/icon/iconFacebook.svg')}`}/>
        </a>
      </li>
    );
  }

  if (props.employer.twitter !== undefined) {
    twitter = (
      <li>
        <a href={`http://${props.employer.twitter}`} target="blank">
          <img src={`${LOCAL_URL}${require('../../../../images/icon/iconTwitter.svg')}`}/>
        </a>
      </li>
    );
  }

  if (props.employer.linkedIn !== undefined) {
    linkedIn = (
      <li>
        <a href={`http://${props.employer.linkedIn}`} target="blank">
          <img src={`${LOCAL_URL}${require('../../../../images/icon/iconLinkedin.svg')}`}/>
        </a>
      </li>
    );
  }

  return (
    <div className="info-container panel-shadow">
      <ul className="social-lists">
        {website}
        {faceBook}
        {twitter}
        {linkedIn}
      </ul>
    </div>
  );
}

export default socialMediaComponent;
