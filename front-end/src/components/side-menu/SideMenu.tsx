import * as React from 'react';

import './SideMenu.scss';

interface MyProps {
  links: JSX.Element[];
  handleClick: () => void;
}

const SideMenu: React.SFC<MyProps> = (props) => {

  const createNavLinks = () => {
    return props.links.map((link, i) => {
      return (
        <li key={i}>
          {link}
        </li>
      );
    });
  };

  return (
    <div className={'side-menu'} onClick={props.handleClick}>
      <ul>
        {createNavLinks()}
      </ul>
    </div>
  );
};

export default SideMenu;
