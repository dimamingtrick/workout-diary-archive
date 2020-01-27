import React, { useCallback } from "react";
import { Switch, Route } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { observer } from "mobx-react";

import Page404 from "./pages/Page404/Page404";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { PrivateRoute, AuthRoute } from "./components/Routes";
import { AuthContext } from "./context";
import { AuthStore } from "./stores";

const Root: React.FC = observer(() => {
  const toggleLogin = useCallback(() => {
    AuthStore.toggleIsLoggedIn();
  }, []);

  return (
    <>
      <div className="pages">
        <Container fixed>
          <AuthContext.Provider
            value={{ isLoggedIn: AuthStore.isLoggedIn, logIn: toggleLogin }}
          >
            <Switch>
              <PrivateRoute path="/" exact>
                <DashboardPage />
              </PrivateRoute>
              <AuthRoute path="/login">
                <LoginPage />
              </AuthRoute>
              <Route component={Page404} />
            </Switch>
          </AuthContext.Provider>
        </Container>
      </div>
    </>
  );
});

export default Root;
