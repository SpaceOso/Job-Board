import * as React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Fade from '../animations/Fade';

class TestComponent extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = { items: [ 'hello', 'world', 'click', 'me' ] };
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd() {
    const newItems = this.state.items.concat([
      prompt('Enter some text ff'),
    ]);
    this.setState({ items: newItems });
  }

  handleRemove = (i) => {
    let newItems = this.state.items.slice();
    newItems.splice(i, 1);
    this.setState({ items: newItems });
  }

  render() {
    const items = (this.state.items.map((item, i) => (
      <Fade key={item}>
        <div>
          {`${item} `}
          <button onClick={() => this.handleRemove(i)}>
            &times;
          </button>
        </div>
      </Fade>
    )));


    return (
      <div className="container">
        <TransitionGroup className="todo-list">
          {items}
        </TransitionGroup>
        <button onClick={() => this.handleAdd()}>Add Item</button>
      </div>
    );
  }
}

export default TestComponent;
