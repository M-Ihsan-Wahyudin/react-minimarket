import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute({ component: Component, ...rest }) {
  const userData = useSelector(state => state.userData.data);
  return (
    <Route
      {...rest}
      render={ () => {
        if(userData.level === rest.level) {
          return <Component/>
        } else {
          return <Redirect to={{ pathname: "/home", state: { from: rest.path } }} />
        }
      }}
    />
  )
}