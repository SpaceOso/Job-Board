import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

// actions
import {AuthEmployee, Employee} from '../../types';
import Slide from '../animations/Slide';
import ModalComponent from '../modal/ModalComponent';
import SideMenu from '../side-menu/SideMenu';

interface MyProps {
  employee: AuthEmployee;
  logOutEmployee: () => {};
  restProps?: any;
}

interface MyState {
  auth: boolean;
  loggedIn: boolean;
  mobile: boolean;
  menuOpen: boolean;
}

class HeaderComponent extends React.Component<MyProps, MyState> {
  state: MyState = {
    auth: false,
    loggedIn: false,
    mobile: false,
    menuOpen: false,
  };

  constructor(props) {
    super(props);

    this.logOut = this.logOut.bind(this);
    this.displayMobileMenuButton = this.displayMobileMenuButton.bind(this);
    this.displayDashboardLink = this.displayDashboardLink.bind(this);
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
    this.createMobileLinks = this.createMobileLinks.bind(this);
  }

  componentDidMount() {
    this.setState({
      mobile: window.innerWidth <= 1046,
      loggedIn: this.props.employee === null,
      auth: this.props.employee.isAuth,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.employee.isAuth !== nextProps.employee.isAuth) {
      return true;
    }

    if (this.state.mobile !== nextState.mobile) {
      return true;
    }

    if (this.state.menuOpen !== nextState.menuOpen) {
      nextState.menuOpen ? document.body.classList.add('noScroll') : document.body.classList.remove('noScroll');
      return true;
    }

    return false;
  }

  toggleMobileMenu() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  displayMobileMenuButton(): JSX.Element {
    return (
      <div className="mobile-nav-menu-btn" onClick={this.toggleMobileMenu}>
        <i className="fas fa-bars fa-2x" style={{ color: 'red' }}/>
      </div>
    );
  }

  logOut(): void {
    this.props.logOutEmployee();
  }

  /**
   * This will check if the employee has an company registered or not determine which route the nav menu should link to
   * @return {JSX.Element} - Link element to either /login - dashboard/home - dashboard/register
   */
  displayDashboardLink(): JSX.Element[] {
    const navButtons: JSX.Element[] = [];

    if (this.props.employee === null || this.props.employee.isAuth === false || this.props.employee.isAuth === undefined) {
      navButtons.push(
        <Link to={'/login'} className="nav-item" key={'login-btn'}>
          Log In
        </Link>,
      );
    } else {
      const dashboardLink = `/employee/dashboard/${this.props.employee.id}`;

      const dashLink = this.props.employee.companyIdentifier !== null ? dashboardLink + '/home' : dashboardLink + '/register';

      if (this.state.mobile) {
        navButtons.push(...this.createMobileLinks(dashboardLink));

        navButtons.push(
          <NavLink key={'log-out'} onClick={this.logOut} className="employee-dashboard-btn" activeClassName={'selected'} to={'/'}>
            <i className={`fas fa-sign-out-alt`}/>Log Out
          </NavLink>,
        );
        return navButtons;
      }

      navButtons.push(
        <Link to={dashLink} className="nav-item" id={'dashboard-btn'} key={'dash-btn'}>
          Dashboard
        </Link>,
      );
      navButtons.push(
        <Link to={'/'} onClick={this.logOut} className="nav-item" key={'logout-btn'}>
          Log Out
        </Link>,
      );
    }

    return navButtons;
  }

  createMobileLinks(dashboardLink) {
    const navAttributes = [
      { title: 'Dashboard', link: 'home', img: 'fa-home' },
      { title: 'Applicants', link: 'applicants', img: 'fa-users' },
      { title: 'Post a Job', link: 'createjob', img: 'fa-file' },
      { title: 'Edit Postings', link: 'editpostings', img: 'fa-pencil-alt' },
      { title: 'Profile Edit', link: 'profile', img: ' fa-employee-circle' },
    ];

    return navAttributes.map((link) => {
      return (
        <NavLink key={link.link} className="employee-dashboard-btn" activeClassName={'selected'} to={`${dashboardLink}/${link.link}`}>
          <i style={{ fontSize: '23px' }} className={`fas ${link.img}`}/>
          <span style={{ marginLeft: '9px' }}>{link.title}</span>
        </NavLink>
      );
    });
  }

  render() {
    const thisEl = document.getElementById('header');
    return (
      <div className="header-component" id={'header'}>
        <Link to="/">
          <div id="header-logo">
            <h1>Job Board</h1>
          </div>
        </Link>
        {this.state.mobile ? this.displayMobileMenuButton() : this.displayDashboardLink()}

        <Slide key={'mobile-nav-menu'} in={this.state.menuOpen} unmountOnExit={true} mountOnEnter={true}>
          <ModalComponent el={thisEl} key={'mobile-nav-menu'}>
            <SideMenu links={this.displayDashboardLink()} handleClick={this.toggleMobileMenu}/>
          </ModalComponent>
        </Slide>
      </div>
    );
  }
}

export default HeaderComponent;
