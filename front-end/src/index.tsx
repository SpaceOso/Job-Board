import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import * as ReduxPromise from 'redux-promise';
import reduxThunk from 'redux-thunk';

// styles
import './styles/main.scss';

// reducers
import rootReducer from './reducers/rootReducer';

// components
import { composeWithDevTools } from 'redux-devtools-extension';
import AppContainer from './components/AppContainer';

import { StoreState } from './types/index';

export const store = createStore<StoreState>(
  rootReducer, composeWithDevTools(applyMiddleware(reduxThunk, ReduxPromise)),
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
