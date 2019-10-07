import React, { FC } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.sass";

import Nav from "./components/Nav";
import Home from "./views/Home";
import Quiz from "./views/Quiz";
import Results from "./views/Results";

import "./App.sass";

const App: FC = () => (
  <div className="App">
    <Nav>testing</Nav>
    <Switch>
      <Route path="/" exact={true} component={Home} />
      <Route path="/play" exact={true} component={Quiz} />
      <Route path="/results" exact={true} component={Results} />
    </Switch>
  </div>
);

export default App;
