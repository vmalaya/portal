import React from "react";
import { Route, Redirect } from "react-router-dom";

const CustomRoute = ({path, isToRedirect, Component, exact, renderFunc}) => {
  return (
    <Route 
      exact={exact} 
      path={path} 
      render={() =>  
        isToRedirect ?
          <Redirect to={"/sign-in"}/>
        : 
        renderFunc ? renderFunc() : <Component />
      }
    />
  )
};

export default CustomRoute;