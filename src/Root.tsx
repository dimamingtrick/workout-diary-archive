import React from "react";
import { Switch, Route } from "react-router-dom";

import Page404 from "./pages/Page404/Page404";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import { PrivateRoute, AuthRoute } from "./components/Routes";

const Root: React.FC = () => {
  return (
    <div className="pages">
      <Switch>
        <PrivateRoute path="/" exact>
          <DashboardPage />
        </PrivateRoute>
        <AuthRoute path="/login">
          <LoginPage />
        </AuthRoute>
        <AuthRoute path="/registration">
          <RegistrationPage />
        </AuthRoute>
        <Route component={Page404} />
      </Switch>
    </div>
  );
};

export default Root;
