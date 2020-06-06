import * as ActionTypes from "../actions/actionTypes";

export default (state = { name: null, room: null, random: false }, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return {
        name: action.data.name,
        room: action.data.room,
        random: action.data.random,
      };
    default:
      return state;
  }
};
