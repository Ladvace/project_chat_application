import * as ActionTypes from "../actions/actionTypes";

export default login = (state = {}, action) => {
  console.log("DISPATCH", action.data, state);
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
