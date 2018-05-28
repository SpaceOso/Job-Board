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

  let doesCompanyHaveLinks: boolean = false;

  let socialLinks = new Map();
  socialLinks.set("website", props.company.website);
  socialLinks.set("facebook", props.company.facebook);
  socialLinks.set("twitter", props.company.twitter);
  socialLinks.set("linkedIn", props.company.linkedIn);

  socialLinks.forEach((v, k) =>{
    if(v !== null){
      if(v.length <= 1){
        socialLinks.set(k, null);
      }
      if(v.includes('http')){
        console.log(k, 'does contain a proper link');
      } else {
        console.log(k, 'does NOT contain  proper link');
      }
    }
  });


  console.log("what are props for this: ", socialLinks);

  if (socialLinks.get("website") !== null) {
    doesCompanyHaveLinks = true;
    website = (
      <li>
        <a href={`${props.company.facebook}`} target="blank">
          <img src={`${LOCAL_URL}${require('../../../../images/icon/iconWeb.svg')}`}/>
        </a>
      </li>
    );
  }

  if (socialLinks.get("facebook") !== null) {
    doesCompanyHaveLinks = true;
    faceBook = (
      <li>
        <a href={`${props.company.facebook}`} target="blank">
          <img src={`${LOCAL_URL}${require('../../../../images/icon/iconFacebook.svg')}`}/>
        </a>
      </li>
    );
  }

  if (socialLinks.get("twitter") !== null) {
    doesCompanyHaveLinks = true;
    twitter = (
      <li>
        <a href={`${props.company.twitter}`} target="blank">
          <img src={`${LOCAL_URL}${require('../../../../images/icon/iconTwitter.svg')}`}/>
        </a>
      </li>
    );
  }

  if (socialLinks.get("linkedIn") !== null) {
    doesCompanyHaveLinks = true;
    linkedIn = (
      <li>
        <a href={`${props.company.linkedIn}`} target="blank">
          <img src={`${LOCAL_URL}${require('../../../../images/icon/iconLinkedin.svg')}`}/>
        </a>
      </li>
    );
  }

  // if the company doesn't have any social media links then don't render anything
  if(!doesCompanyHaveLinks){
    return null;
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
