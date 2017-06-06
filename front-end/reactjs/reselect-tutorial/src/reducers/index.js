import { CHANGE_NAME, CHANGE_NATIONALITY, CHANGE_PHONE_NUMBER, CLEAR_ALL } from '../constants';

const initialState = {
  name: 'Jaewon',
  nationality: 'Korea',
  phoneNumber: '010-0000-0000',
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_NAME:
      return {
        ...state,
        name: action.name,
      };
    case CHANGE_NATIONALITY:
      return {
        ...state,
        nationality: action.nationality,
      };
    case CHANGE_PHONE_NUMBER:
      return {
        ...state,
        phoneNumber: action.phoneNumber,
      };
    case CLEAR_ALL:
      return {
        ...state,
        name: '',
        nationality: '',
        phoneNumber: '',
      };
    default:
      return state;
  }
};

export default rootReducer;

