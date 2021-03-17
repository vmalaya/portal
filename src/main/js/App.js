import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,StaticRouter, Switch, Route } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';
import Tasks from './pages/Tasks';
import Groups from './pages/Groups';

import 'antd/dist/antd.min.css';

const App = ()=> {
        return (

            <Switch>
              <Route exact={true} path={"/"} component={Tasks}/>
              <Route path={"/groups"} component={Groups}/>
            </Switch>


        );
};
export default App;

const anyWindow = window;
anyWindow.renderApp = () => {
  ReactDOM.hydrate(<BrowserRouter><App /></BrowserRouter>, document.getElementById('app'))
};

console.log("kokooSS", window.location.origin)
anyWindow.renderAppOnServer = () => {
  return ReactDOMServer.renderToString(<StaticRouter location={window.location.origin}><App /></StaticRouter>)
};
anyWindow.isServer = false;

// ReactDOM.render(<App />, document.querySelector("#app"));