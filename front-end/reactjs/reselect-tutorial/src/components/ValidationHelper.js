import React from 'react';
import PropTypes from 'prop-types';
import { isERROR } from '../constants';

const ValidationHelper = ({ status }) => {
  if (isERROR(status)) {
    return (
      <small style={{ color: 'red' }}>{status.message || 'Not fulfilled'}</small>
    );
  }

  return (
    <small style={{ color: 'green' }}>✓</small>
  );
};

ValidationHelper.propTypes = {
  status: PropTypes.object.isRequired,
};

export default ValidationHelper;

