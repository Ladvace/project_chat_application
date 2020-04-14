import * as ActionTypes from "./actionTypes";

export function login(name, room) {
  console.log("azione", name, room);
  return (dispatch) => {
    dispatch({
      type: ActionTypes.LOGIN,
      data: { name: name, room: room },
    });
  };
}

export default login;
