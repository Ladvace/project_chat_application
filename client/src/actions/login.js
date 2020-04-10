import * as ActionTypes from "./actionTypes";

export function login(name, room) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.LOGIN,
      data: { name, room },
    });
  };
}

export default login;
