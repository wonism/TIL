import React from 'react';
import PropTypes from 'prop-types';

const toCapitalize = str => `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`;
const toTitlize = str => str.split('-').map(toCapitalize).join('');

const Validator = ({ type, value, onChange }) => (
  <span>
    <label htmlFor={type}>{toTitlize(type)}</label>
    <input
      id={type}
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  </span>
);

export default Validator;

