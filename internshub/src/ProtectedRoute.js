import React from "react";
import { Route, Redirect } from "react-router-dom";
import { showAlert } from "./Components/Utilities/Alerts";
export const ProtectedRouteStudent = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (localStorage.type === "Student") {
          return <Component {...props} />;
        } else {
          return (
            <div>
              {showAlert("error", "No Permission")}
              <Redirect
                to={{
                  pathname: "/forbidden",
                  state: {
                    from: props.location
                  }
                }}
              />
            </div>
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
            <div>
              {showAlert("error", "No Permission")}

              <Redirect
                to={{
                  pathname: "/forbidden",
                  state: {
                    from: props.location
                  }
                }}
              />
            </div>
          );
        }
      }}
    />
  );
};
