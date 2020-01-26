import React, { useState, useCallback } from "react";
import { Switch, Route } from "react-router-dom";
import Container from "@material-ui/core/Container";

import Page404 from "./pages/Page404/Page404";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { PrivateRoute, AuthRoute } from "./components/Routes";
import { AuthContext } from "./context";

const Root: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logIn = useCallback(() => {
    setIsLoggedIn(!isLoggedIn);
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, logIn }}>
      <div className="pages">
        <Container fixed>
          <Switch>
            <PrivateRoute path="/" exact>
              <DashboardPage />
            </PrivateRoute>
            <AuthRoute path="/login">
              <LoginPage />
            </AuthRoute>
            <Route component={Page404} />
          </Switch>
        </Container>
      </div>
    </AuthContext.Provider>
  );
};

export default Root;
