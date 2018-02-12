import * as React from 'react';

interface MyProps {
  list: any[];
  listName: string;
  onChangeCB: (value) => void;
}

class DropDownComponent extends React.Component<MyProps, any> {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (this.props.list !== null) {
    }
  }

  createOptions(): JSX.Element[] {
    return this.props.list.map((listItem, index) => {
      return (
        <option key={listItem.id} value={listItem.id}>{listItem.title}</option>
      );
    });
  }

  handleChange(event) {
    console.log('dropdown change detected:', event.target.value);
    this.props.onChangeCB(event.target.value);
  }

  render() {
    return (
      <div>
        <select name={this.props.listName} onChange={this.handleChange}>
          {this.createOptions()}
        </select>
      </div>
    );
  }
}

export default DropDownComponent;
