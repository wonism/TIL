import { OK, ERROR_REQUIRED, ERROR_INVALID_PHONE_NUMBER } from '../constants';

const checkName = n => (!!n ? OK : ERROR_REQUIRED);
const checkNationality = n => (!!n ? OK : ERROR_REQUIRED);
const checkPhoneNumber = (n) => {
  if (n) {
    if (!/^\d{3}-?\d{3,4}-?\d{4}/.test(n)) {
      return ERROR_INVALID_PHONE_NUMBER;
    }

    return OK;
  }

  return ERROR_REQUIRED;
};

export { checkName, checkNationality, checkPhoneNumber };

