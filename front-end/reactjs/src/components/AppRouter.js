import React from 'react';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';

import App from './App';
import Home from './Home';
import About from './About';
import Articles from './Articles';

class AppRouter extends React.Component {
  render() {
    return (
      <Router history = { browserHistory }>
        <Route path = "/" component = { App }>
          <IndexRoute component = { Home } />
          <Route path = "home" component = { Home } />
          <Route path = "about" component = { About } />
          <Route path = "articles" component = { Articles } />
        </Route>
      </Router>
    );
  }
}

export default AppRouter;

