import React, {useState, useEffect } from "react";
import { Redirect, Switch, useLocation, Route } from "react-router-dom";
import { Layout } from 'antd';
import SignIn from './pages/SignIn';
import Tasks from "./pages/Tasks";
import Groups from "./pages/Groups";
import Navigation from "./components/Navigation";
import Task from "./pages/Task";
import Group from "./pages/Group";
import CustomRoute from "./components/CustomRoute";

import "antd/dist/antd.min.css";

const App = () => {
  const { pathname } = useLocation();
  const [userAuthorized, setUserStatus] = useState(false);
  const [newTask, setNewTask] = useState({status: false, uuid: ""});
  const [newGroup, setNewGroup] = useState({status: false, uuid: ""});

  useEffect(() => {
    if (newTask.status) setNewTask({status: false, uuid: ""});
  }, [newTask]);

  useEffect(() => {
    if (newGroup.status) setNewGroup({status: false, uuid: ""});
  }, [newGroup]);

  return (
    <Layout style={{"minHeight": "100vh"}}>
      { pathname.includes('/sign-in') ? null : <Navigation setUserStatus={setUserStatus} /> }
      <Switch>
        <CustomRoute isToRedirect={!userAuthorized} exact={true} path={"/"} renderFunc={
          () => newTask.status ? 
          <Redirect to={`/tasks/${newTask.uuid}`} />
          : 
          <Tasks setNewTask={setNewTask} userAuthorized={userAuthorized} />
          }
           />
        <CustomRoute isToRedirect={!userAuthorized} exact={true} path={"/groups"} renderFunc={() => 
          newGroup.status ?
          <Redirect to={`/groups/${newGroup.uuid}`} />
          :
          <Groups setNewGroup={setNewGroup} userAuthorized={userAuthorized} />}
        />
        <CustomRoute 
          isToRedirect={!userAuthorized}
          exact={true}
          path={"/tasks/:taskId"}
          renderFunc={() => <Task userAuthorized={userAuthorized} />}
        />
        <CustomRoute 
            isToRedirect={!userAuthorized}
            exact={true}
            path={"/groups/:groupId"}
            renderFunc={() => <Group userAuthorized={userAuthorized} />}
          />
        <Route 
          exact={true}
          path={"/sign-in"}
          render={() => userAuthorized ? <Redirect to={"/"} /> : <SignIn setUserStatus={setUserStatus} />}
        />
      </Switch>
    </Layout>
  );
};
export default App;
