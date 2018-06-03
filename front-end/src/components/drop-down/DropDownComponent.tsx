import * as React from 'react';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import './DropDown.scss';

interface MyProps {
  list: any[];
  helperText: string;
  defaultValue: {};
  listName: string;
  onChangeCB: (value) => void;
}

class DropDownComponent extends React.Component<MyProps, any> {
  state = {
   selectedOption: '-',
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.initDropDown = this.initDropDown.bind(this);
  }

  componentDidMount() {
    if (this.props.list !== null) {
      // this.setState({selectedOption: this.props.list[0]})
    }
  }

  createOptions(): JSX.Element[] {
    return this.props.list.map((listItem, index) => {
      return (
        <MenuItem key={listItem.id} value={listItem.id}>{listItem.title}</MenuItem>
      );
    });
  }

  initDropDown(): JSX.Element{
    return (
      <MenuItem value={'-'}>Please Select an option</MenuItem>
    )
  }

  handleChange(event) {
    this.props.list.forEach(listItem => {
      if(listItem.id === event.target.value){
        this.setState({selectedOption: listItem.id})
      }
    });
    this.props.onChangeCB(event.target.value);
  }

  render() {

    return (
      <div className="drop-down">
        <FormControl style={{width: 'auto'}}>
          <InputLabel htmlFor={this.props.listName}>{this.props.helperText}</InputLabel>
          <Select
            value={this.state.selectedOption}
            onChange={this.handleChange}
            autoWidth
            placeholder="Select a value"
            input={<Input name={this.props.listName} id={this.props.listName + '-id'} />}
          >
            {this.state.selectedOption === '-' ? this.initDropDown() : null}
            {this.createOptions()}
          </Select>
        </FormControl>
      </div>

    );
  }
}

// export default withStyles(styles)(DropDownComponent);
export default DropDownComponent;
