import * as React from 'react';
import { Company } from '../../../types';
import { LOCAL_URL } from '../../../utils/utils';

interface MyProps {
  // TODO need to pass company to get correct links
    company: Company;
}

function socialMediaComponent(props: MyProps) {

  let website: JSX.Element | null = null;
  let faceBook: JSX.Element | null = null;
  let twitter: JSX.Element | null = null;
  let linkedIn: JSX.Element | null = null;

  if (props.company.website !== undefined) {
    website = (
      <li>
        <a href={`http://${props.company.facebook}`} target="blank">
          <img src={`${LOCAL_URL}${require('../../../../images/icon/iconWeb.svg')}`}/>
        </a>
      </li>
    );
  }

  if (props.company.facebook !== undefined) {
    faceBook = (
      <li>
        <a href={`http://${props.company.facebook}`} target="blank">
          <img src={`${LOCAL_URL}${require('../../../../images/icon/iconFacebook.svg')}`}/>
        </a>
      </li>
    );
  }

  if (props.company.twitter !== undefined) {
    twitter = (
      <li>
        <a href={`http://${props.company.twitter}`} target="blank">
          <img src={`${LOCAL_URL}${require('../../../../images/icon/iconTwitter.svg')}`}/>
        </a>
      </li>
    );
  }

  if (props.company.linkedIn !== undefined) {
    linkedIn = (
      <li>
        <a href={`http://${props.company.linkedIn}`} target="blank">
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
