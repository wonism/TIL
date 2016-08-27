import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoApp from './reducers';
import App from './components/App';

let store = createStore(todoApp);

render(
  <Provider store = { store }>
    <App />
  </Provider>,
  document.getElementById('root')
);

/***** for test *****/
/*
import { createStore } from 'redux';
import todoApp from './reducers';

let store = createStore(todoApp);
*/

/*
import { createStore } from 'redux';
import todoApp from './reducers';
import { addTodo, toggleTodo, setVisibilityFilter, VisibilityFilters } from './actions';

let store = createStore(todoApp);

// Log the initial state
console.log('***** initial state *****\nstore.getState()\n');
console.log(store.getState());

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
let unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

// Dispatch some actions
store.dispatch(addTodo('Learn about actions'));
store.dispatch(addTodo('Learn about reducers'));
store.dispatch(addTodo('Learn about store'));
store.dispatch(toggleTodo(0));
store.dispatch(toggleTodo(1));
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED));

// Stop listening to state updates
unsubscribe();
*/
