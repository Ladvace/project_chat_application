import * as ActionTypes from "./actionTypes";

export function login(name, room, random) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.LOGIN,
      data: { name: name, room: room, random: random },
    });
  };
}

export default login;
