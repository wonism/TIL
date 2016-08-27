import React from 'react';
import ReactDOM from 'react-dom';
// import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
// import Test from './components/Test';
// import App from './components/App';
import AppRouter from './components/AppRouter';

const rootElement = document.getElementById('root');

/*
App.defaultProps = {
  headerTitle: 'Default header',
  contentTitle: 'Default contentTitle',
  contentBody: 'Default contentBody'
};
*/

// ReactDOM.render(<Test />, rootElement);
/*
ReactDOM.render(<App headerTitle = 'Welcome!'
                    contentTitle = 'Stranger,'
                    contentBody = 'Welcome to React JS Sample Application!'/>,
                rootElement);
*/

ReactDOM.render(<AppRouter />, rootElement);

// ReactDOM.render(<App />, rootElement);
/*
ReactDOM.render(
    <Router history = { browserHistory }>
      <Route path = "/" component = { App }>
        <IndexRoute component = { Home } />
        <Route path = "home" component = { Home } />
        <Route path = "about" component = { About } />
        <Route path = "articles" component = { Articles } />
      </Route>
    </Router>,
    document.getElementById('app')
);
*/
