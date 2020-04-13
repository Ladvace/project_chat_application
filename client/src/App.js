import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import Chat from "./components/Chat/Chat";
import Join from "./components/Join/Join";
import configureStore, { history } from "./configureStore";

// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" render={() => <Join />} />
          <Route exact path="/chat" render={() => <Chat />} />
          <Route render={() => <div>Miss</div>} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
