import { combineReducers } from "redux";
import login from "./login";
import { connectRouter } from "connected-react-router";

const reducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    login,
  });

export default reducer;
