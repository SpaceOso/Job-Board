import * as React from 'react';

interface MyProps {
  src: string;
  height: string | undefined;
  width: string;
}

class Iframe extends React.Component<MyProps> {
  render() {
    return (
      <object
        data={this.props.src}
        height={this.props.height}
        width={this.props.width}
        style={{ height: this.props.height }}
      />
    );
  }
}

export default Iframe;