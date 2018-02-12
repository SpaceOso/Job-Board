import * as React from 'react';
import * as ReactDOM from 'react-dom';

// styles
import './ModalComponent.scss';

const modalParent = document.getElementById('modal-root');

interface MyProps {
  el?: any;
}

class ModalComponent extends React.Component<MyProps, {}> {
  static defaultProps: Partial<MyProps> = {
    el: modalParent as Element,
  };

  constructor(props) {
    super(props);

  }

  render() {
    return (
      ReactDOM.createPortal(this.props.children, this.props.el)
    );

  }
}

export default ModalComponent;
