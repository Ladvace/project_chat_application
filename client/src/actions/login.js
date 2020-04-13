import * as ActionTypes from "./actionTypes";

export function login(name, room) {
  console.log("azione", name, room);
  return (dispatch) => {
    dispatch({
      type: ActionTypes.LOGIN,
      // data: { name: name, room: room },
      name,
      room,
    });
  };
}

export default login;
