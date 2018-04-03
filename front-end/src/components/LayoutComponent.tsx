import * as React from 'react';

import {AuthEmployee, Employee} from '../types/';
import { default as FooterComponent } from './footer/footerComponent';
import HeaderComponent from './header/HeaderComponent';

interface Props {
    employee: AuthEmployee;
  logOutEmployee;
}

class LayoutComponent extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app-wrapper">
        <HeaderComponent {...this.props} employee={this.props.employee} logOutEmployee={this.props.logOutEmployee} />
        {this.props.children}
        <FooterComponent/>
      </div>
    );
  }
}

export default LayoutComponent;
