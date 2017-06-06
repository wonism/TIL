const OK = { type: 'OK', hasMessage: false };
const ERROR = { type: 'ERROR', hasMessage: false };
const ERROR_REQUIRED = { type: 'ERROR', hasMessage: true, message: 'Required' };
const ERROR_INVALID_PHONE_NUMBER = { type: 'ERROR', hasMessage: true, message: 'Phone number must satisfy 000-0000-0000' };

function isOK(status) {
  return status.type === OK.type;
}

function isERROR(status) {
  return status.type === ERROR.type;
}

export { OK, ERROR, ERROR_REQUIRED, ERROR_INVALID_PHONE_NUMBER, isOK, isERROR };

