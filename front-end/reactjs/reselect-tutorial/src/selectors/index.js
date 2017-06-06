import { createSelector, createStructuredSelector } from 'reselect';
import { checkName, checkNationality, checkPhoneNumber } from './validator';
import { OK, ERROR, isOK } from '../constants';

const nameSelector = createSelector(
  state => state.name,
  name => checkName(name),
);

const nationalitySelector = createSelector(
  state => state.nationality,
  nationality => checkNationality(nationality),
);

const phoneNumberSelector = createSelector(
  state => state.phoneNumber,
  phoneNumber => checkPhoneNumber(phoneNumber),
);

const resultSelector = createSelector(
  nameSelector,
  nationalitySelector,
  phoneNumberSelector,
  (name, nationality, phoneNumber) => (
    [name, nationality, phoneNumber].every(status => isOK(status)) ? OK : ERROR),
);

const rootSelector = createStructuredSelector({
  result: resultSelector,
  name: nameSelector,
  nationality: nationalitySelector,
  phoneNumber: phoneNumberSelector,
});

export default rootSelector;

