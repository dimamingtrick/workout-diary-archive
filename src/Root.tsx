import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useObserver } from "mobx-react";

import Page404 from "./pages/Page404/Page404";
import DashboardPages from "./pages/DashboardPages/DashboardPages";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import { PrivateRoute, AuthRoute } from "./components/Routes";
import InitialLoader from "./components/InitialLoader";
import {
  ZoomInOutTransition,
  FadeInOutTransition
} from "./components/animations";
import { useStores } from "./hooks";

const Root: React.FC = () => {
  const { AuthStore } = useStores();

  useEffect(() => {
    AuthStore.initialize();
    // eslint-disable-next-line
  }, []);

  return useObserver(() => (
    <>
      <ZoomInOutTransition show={AuthStore.initialized}>
        <div className="pages">
          <Switch>
            <Route path="/" exact>
              <Redirect to={AuthStore.isLoggedIn ? "/app" : "/login"} />
            </Route>
            <PrivateRoute path="/app">
              <DashboardPages />
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
      </ZoomInOutTransition>
      <FadeInOutTransition show={!AuthStore.initialized}>
        <InitialLoader />
      </FadeInOutTransition>
      <div className="pages-background" />
    </>
  ));
};

export default Root;
