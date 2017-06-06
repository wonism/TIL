import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/App';
import reducer from './reducers';

const store = createStore(reducer);
const rootElement = document.getElementById('reselect-tutorial');

render(<Provider store={store}>
  <App />
</Provider>,
rootElement);

