import React, {useState} from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { Layout } from 'antd';
import SignIn from './pages/SignIn';
import Tasks from "./pages/Tasks";
import Groups from "./pages/Groups";
import Navigation from "./components/Navigation";
import Task from "./pages/Task";

import "antd/dist/antd.min.css";

const App = () => {
  const { pathname } = useLocation();
  const [newTask, setNewTask] = useState({status: false, uuid: ""});
  

  return (
    <Layout style={{"minHeight": "100vh"}}>
      { pathname.includes('/sign-in') ? null : <Navigation /> }
      <Switch>
        <Route exact={true} path={"/"} render={
          () => newTask.status ? 
          <Redirect to={`/tasks/${newTask.uuid}`} />
           : 
           <Tasks setNewTask={setNewTask}/>
           } />
        <Route exact path={"/groups"} component={Groups} />
        <Route exact={true} path={"/tasks/:taskId"} component={Task} />
        <Route exact={true} path={"/sign-in"} component={SignIn} />
      </Switch>
    </Layout>
  );
};
export default App;
