import * as ActionTypes from "../actions/actionTypes";

const login = (state = { name: null, room: null }, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return {
        ...state,
        name: action.name,
        room: action.room,
      };
    default:
      return state;
  }
};

export default login;
