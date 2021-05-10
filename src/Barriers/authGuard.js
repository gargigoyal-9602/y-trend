import React from "react";
import { Route } from "react-router-dom";

export const PrivateRoute = ({ component: Component, path, ...rest }) => {
  console.log(rest, path);
  return (
    <Route
      exact
      path={path}
      render={(props) => {
        console.log(props);
      }}
    />
  );
};
