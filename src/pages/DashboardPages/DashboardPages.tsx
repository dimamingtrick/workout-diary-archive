import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { useObserver } from "mobx-react";

import WorkoutPage from "./WorkoutPage/WorkoutPage";
import CurrentExercisePage from "./CurrentExercisePage/CurrentExercisePage";
import WorkoutHistoryPage from "./WorkoutHistoryPage/WorkoutHistoryPage";
import ExercisesPage from "./ExercisesPage/ExercisesPage";
import SettingsPage from "./SettingsPage/SettingsPage";
import Page404 from "../Page404/Page404";

import BottomTabNavigation from "../../components/BottomTabNavigation";
import WorkoutTimer from "../../components/WorkoutTimer";
import "./dashboard.scss";

const DashboardPages: React.FC = () => {
  const { url } = useRouteMatch();

  return useObserver(() => (
    <>
      <div className="page-wrapper">
        <Switch>
          <Route path={`${url}`} exact>
            <WorkoutPage />
          </Route>
          <Route path={`${url}/current-exercise`}>
            <CurrentExercisePage />
          </Route>
          <Route path={`${url}/history`}>
            <WorkoutHistoryPage />
          </Route>
          <Route path={`${url}/exercises`}>
            <ExercisesPage />
          </Route>
          <Route path={`${url}/settings`}>
            <SettingsPage />
          </Route>
          <Route component={Page404} />
        </Switch>
      </div>
      <BottomTabNavigation />
      <WorkoutTimer />
    </>
  ));
};

export default DashboardPages;
