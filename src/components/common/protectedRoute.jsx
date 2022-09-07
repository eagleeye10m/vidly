import React from "react";
import auth from "../../services/authService";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.getCurrentUser())
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }, //go to login form for additional data
              }}
            />
          ); //we can set 'to' to an object
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
