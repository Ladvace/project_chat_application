import * as ActionTypes from "./actionTypes";

export function login(name, room) {
  console.log("azione", name, room);
  return (dispatch) => {
    dispatch({
      type: ActionTypes.LOGIN,
      name,
      room,
    });
  };
}

export default login;
