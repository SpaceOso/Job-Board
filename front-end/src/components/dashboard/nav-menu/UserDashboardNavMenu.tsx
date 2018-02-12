import * as React from 'react';
import { NavLink } from 'react-router-dom';
import images from '../../../../images/images';

// styles
import './UserDashboardNavMenu.scss';

interface MyProps {
  match;
}

class UserDashboardNavMenu extends React.Component<MyProps> {

  render() {

    const navAttributes = [
      { title: 'Dashboard', link: 'home', img: 'fa-home' },
      { title: 'Applicants', link: 'applicants', img: 'fa-users' },
      { title: 'Post a Job', link: 'createjob', img: 'fa-file' },
      { title: 'Edit Postings', link: 'editpostings', img: 'fa-pencil-alt' },
      { title: 'Profile Edit', link: 'profile', img: ' fa-user-circle' },
    ];
    const navBtns = navAttributes.map((link) => {
      return (
        <NavLink key={link.link} className="user-dashboard-btn" activeClassName={'selected'} to={`${this.props.match.url}/${link.link}`}>
          <i style={{ fontSize: '23px' }} className={`fas ${link.img}`}/>
          <span style={{ marginLeft: '9px' }}>{link.title}</span>
        </NavLink>
      );
    });

    return (
      <div className="user-dashboard-nav">
        {navBtns}
      </div>
    );
  }
}

export default UserDashboardNavMenu;
