import { CHANGE_NAME, CHANGE_NATIONALITY, CHANGE_PHONE_NUMBER, CLEAR_ALL } from '../constants';

function changeName(name) {
  return {
    type: CHANGE_NAME,
    name,
  };
}

function changeNationality(nationality) {
  return {
    type: CHANGE_NATIONALITY,
    nationality,
  };
}

function changePhoneNumber(phoneNumber) {
  return {
    type: CHANGE_PHONE_NUMBER,
    phoneNumber,
  };
}

function clearAll() {
  return {
    type: CLEAR_ALL,
  };
}

export { changeName, changeNationality, changePhoneNumber, clearAll };

