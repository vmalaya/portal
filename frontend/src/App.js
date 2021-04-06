import React from "react";
import { Switch, Route } from "react-router-dom";
import Tasks from "./pages/Tasks";
import Groups from "./pages/Groups";
import Navigation from "./components/Navigation";
import Task from "./pages/Task";

import "antd/dist/antd.min.css";

const App = () => {
  return (
    <>
      <Navigation />
      <Switch>
        <Route exact={true} path={"/"} component={Tasks} />
        <Route path={"/groups"} component={Groups} />
        <Route exact={true} path={"/tasks/:taskId"} component={Task} />
      </Switch>
    </>
  );
};
export default App;
