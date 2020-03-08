import React from "react";
import { Route, Redirect } from "react-router-dom";
export const ProtectedRouteStudent = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (localStorage.type === "Student") {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/studentHome",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};

export const ProtectedRouteCompany = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (localStorage.type === "Company") {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/companyHome",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
