import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
// import { applyMiddleware, createStore } from 'redux';
import * as redux from 'redux';
import reduxThunk from 'redux-thunk';
import { StoreState } from './types/index';

declare module 'redux' {
  export type GenericStoreEnhancer = any;
}

// styles
import './styles/main.scss';

// reducers
import rootReducer from './reducers/rootReducer';

// components
import { composeWithDevTools } from 'redux-devtools-extension';
import AppContainer from './components/AppContainer';

export const store = redux.createStore(
  rootReducer,
  composeWithDevTools(redux.applyMiddleware(reduxThunk)),
);

class JobBoard extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <AppContainer/>
        </div>
      </Provider>
    );
  }
}

render(<JobBoard/>, document.getElementById('root'));
