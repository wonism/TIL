import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider  } from 'react-redux';
import App from './components/App';
import counterApp from './reducers';

const store = createStore(counterApp);
const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store = { store }>
    <App />
  </Provider>,
  rootElement
);

