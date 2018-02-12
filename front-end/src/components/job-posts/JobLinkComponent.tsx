import * as React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  to: string;
  onClick: (jobId) => void;
  value: string | null;
}

class JobLinkComponent extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick(this.props.value);
  }

  render() {
    return (
      <Link
        to={this.props.to}
        onClick={this.handleClick}
      >
        {this.props.children}
      </Link>
    );
  }
}

export default JobLinkComponent;
