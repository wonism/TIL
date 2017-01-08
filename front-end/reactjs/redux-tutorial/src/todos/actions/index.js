import { actionTypes } from '../constants';

const { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER } = actionTypes;
let nextTodoId = 0;

function addTodo(text) {
  return {
    id: nextTodoId++,
    type: ADD_TODO,
    text,
  };
}

function toggleTodo(id) {
  return {
    type: TOGGLE_TODO,
    id,
  };
}

function setVisibilityFilter(filter) {
  return {
    type: SET_VISIBILITY_FILTER,
    filter,
  };
}

export { addTodo, toggleTodo, setVisibilityFilter };

