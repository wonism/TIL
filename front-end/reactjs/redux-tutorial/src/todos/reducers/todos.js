import { actionTypes } from '../constants';

const { ADD_TODO, TOGGLE_TODO } = actionTypes;

function todos(state = [], action) {
  switch (action.type) {
  case ADD_TODO:
    return [
      ...state,
      {
        id: action.id,
        text: action.text,
        completed: false,
      }
    ];
  case TOGGLE_TODO:
    return [
      ...state.slice(0, action.id),
      {
        ...state[action.id],
        completed: !state[action.id].completed,
      },
      ...state.slice(action.id + 1)
    ];
  default:
    return state;
  }
}

export default todos;

