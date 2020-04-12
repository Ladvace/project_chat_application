import { combineReducers } from "redux";
import login from "../actions/login";
import { connectRouter } from "connected-react-router";

const reducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    login,
  });

export default reducer;
