import * as ActionTypes from "../actions/actionTypes";

export default (state = {}, action) => {
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
