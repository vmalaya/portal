import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Tasks from './pages/Tasks';
import Groups from './pages/Groups';

import 'antd/dist/antd.min.css';

const App = ()=> {
        return (
          <BrowserRouter basename={"/"}>
            <Switch>
              <Route exact={true} path={"/"} component={Tasks}/>
              <Route path={"/groups"} component={Groups}/>
            </Switch>
          </BrowserRouter>

        );
};

export default App;

ReactDOM.render(<App />, document.querySelector("#app"));