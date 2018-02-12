import * as React from 'react';

import { User } from '../types/';
import { default as FooterComponent } from './footer/footerComponent';
import HeaderComponent from './header/HeaderComponent';

interface Props {
  user: User;
  logOutUser;
}

class LayoutComponent extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app-wrapper">
        <HeaderComponent {...this.props} user={this.props.user} logOutUser={this.props.logOutUser} />
        {this.props.children}
        <FooterComponent/>
      </div>
    );
  }
}

export default LayoutComponent;
