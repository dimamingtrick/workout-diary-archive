import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { observer } from "mobx-react";

import { useStores } from "../../hooks";

export const PrivateRoute: React.FC<RouteProps> = observer(
  ({ children, ...rest }) => {
    const {
      AuthStore: { isLoggedIn }
    } = useStores();
    return (
      <Route
        {...rest}
        render={({ location }) =>
          isLoggedIn ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }
);
