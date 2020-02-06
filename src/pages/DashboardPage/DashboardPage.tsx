import React, { useCallback } from "react";
import { Switch, Route } from "react-router-dom";
import { useObserver } from "mobx-react";

import BottomTabNavigation from "../../components/BottomTabNavigation";
import { useStores } from "../../hooks";
import "./dashboard.scss";

const WorkoutPage: React.FC = () => {
  return (
    <div>
      <span>Workout</span>
    </div>
  );
};

const DashboardPage: React.FC = () => {
  const { AuthStore } = useStores();

  const handleLogout = useCallback(() => {
    AuthStore.logout();
  }, [AuthStore]);

  return useObserver(() => (
    <>
      <div className="content">
        <Switch>
          <Route path="/" exact>
            <WorkoutPage />
          </Route>
        </Switch>
        <button onClick={handleLogout}>Logout</button>
        <span>Dashboard Page</span>
      </div>
      <BottomTabNavigation />
    </>
  ));
};

export default DashboardPage;
