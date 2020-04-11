import React from "react";
import { Provider } from "react-redux";
import Chat from "./components/Chat/Chat";
import Join from "./components/Join/Join";
import configureStore from "./configureStore";

import { BrowserRouter as Router, Route } from "react-router-dom";

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/" exact component={Join} />
        <Route path="/chat" component={Chat} />
      </Router>
    </Provider>
  );
};

export default App;
