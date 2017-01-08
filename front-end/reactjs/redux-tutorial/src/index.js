import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './todos/components/App';
import todoApp from './todos/reducers';

const store = createStore(todoApp);
const rootElement = document.getElementById('redux-app');

render(
  <Provider store={store}>
    <App />
  </Provider>, rootElement
);

