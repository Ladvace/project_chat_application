import * as ActionTypes from "../actions/actionTypes";

export default (state = {}, action) => {
  console.log("DISPATCH", action.data, state);
  switch (action.type) {
    case ActionTypes.LOGIN:
      return {
        name: action.data.name,
        room: action.data.room,
      };
    default:
      return state;
  }
};
