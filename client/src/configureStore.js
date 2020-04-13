import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import { composeWithDevTools } from "redux-devtools-extension";
import monitorReducersEnhancer from "./enhancers/monitorReducer";
import loggerMiddleware from "./middleware/logger";
import rootReducer from "./reducers";

export const history = createBrowserHistory();

export default function configureStore(preloadedState) {
  const middlewares = [
    routerMiddleware(history),
    loggerMiddleware,
    thunkMiddleware,
  ];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [
    middlewareEnhancer,
    monitorReducersEnhancer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  ];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(
    rootReducer(history),
    preloadedState,
    composedEnhancers
  );

  //   const store = createStore(
  //     rootReducer,
  //     composeWithDevTools(
  //       applyMiddleware(...middleware)
  //       // other store enhancers if any
  //     )
  //   );

  return store;
}
