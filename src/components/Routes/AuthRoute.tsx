import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { observer } from "mobx-react";

import { useStores } from "../../hooks";

export const AuthRoute: React.FC<RouteProps> = observer(
  ({ children, ...rest }) => {
    const { AuthStore } = useStores();

    if (AuthStore.isLoggedIn) {
      return (
        <Route
          {...rest}
          render={({ location }) => (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )}
        />
      );
    }

    return <Route {...rest} render={() => children} />;
  }
);
