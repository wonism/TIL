import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import rootSelector from '../selectors';
import MainPanel from '../components';

const App = props => <MainPanel {...props} />;

function mapStateToProps(state) {
  const validation = rootSelector(state);

  return {
    state,
    validation,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

