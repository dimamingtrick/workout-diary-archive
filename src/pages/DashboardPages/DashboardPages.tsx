import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { useObserver } from "mobx-react";

import WorkoutPage from "./WorkoutPage/WorkoutPage";
import WorkoutHistoryPage from "./WorkoutHistoryPage/WorkoutHistoryPage";
import ExercisesPage from "./ExercisesPage/ExercisesPage";
import SettingsPage from "./SettingsPage/SettingsPage";
import Page404 from "../Page404/Page404";

import BottomTabNavigation from "../../components/BottomTabNavigation";
import Header from "../../components/Header";
import "./dashboard.scss";

const DashboardPages: React.FC = () => {
  const match = useRouteMatch();

  return useObserver(() => (
    <>
      <div className="page-wrapper">
        <Header />
        <Switch>
          <Route path={`${match.url}`} exact>
            <WorkoutPage />
          </Route>
          <Route path={`${match.url}/history`}>
            <WorkoutHistoryPage />
          </Route>
          <Route path={`${match.url}/exercises`}>
            <ExercisesPage />
          </Route>
          <Route path={`${match.url}/settings`}>
            <SettingsPage />
          </Route>
          <Route component={Page404} />
        </Switch>
      </div>
      <BottomTabNavigation />
    </>
  ));
};

export default DashboardPages;
