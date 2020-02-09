import React, { useCallback } from "react";
import { useLocation, useHistory, useRouteMatch } from "react-router-dom";
import { GiStrong } from "react-icons/gi";
import { FaListUl, FaRegEdit } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

import TabItem from "./TabItem";
import { useStores } from "../../hooks";
import { useObserver } from "mobx-react";
import "./bottom-tab-navigation.scss";

const BottomTabNavigation: React.FC = () => {
  const { WorkoutStore } = useStores();
  const { pathname } = useLocation();
  const { push } = useHistory();
  const { url } = useRouteMatch();

  const handleTabItemClick = useCallback(
    path => {
      push(path);
    },
    [push]
  );

  return useObserver(() => (
    <div className="tab">
      <TabItem
        icon={GiStrong}
        title="Workout"
        path={url}
        isActive={pathname === url}
        className={WorkoutStore.isRunning ? "is-running" : ""}
        onClick={handleTabItemClick}
      />
      <TabItem
        icon={FaListUl}
        title="History"
        path={`${url}/history`}
        isActive={pathname === `${url}/history`}
        onClick={handleTabItemClick}
      />
      <TabItem
        icon={FaRegEdit}
        title="Exercises"
        path={`${url}/exercises`}
        isActive={pathname === `${url}/exercises`}
        onClick={handleTabItemClick}
      />
      <TabItem
        icon={IoMdSettings}
        title="Settings"
        path={`${url}/settings`}
        isActive={pathname === `${url}/settings`}
        onClick={handleTabItemClick}
      />
    </div>
  ));
};

export default BottomTabNavigation;
