import React, { useCallback } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { GiStrong } from "react-icons/gi";
import { FaListUl, FaRegEdit } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

import TabItem from "./TabItem";
import "./bottom-tab-navigation.scss";

const BottomTabNavigation: React.FC = () => {
  const { pathname } = useLocation();
  const { push } = useHistory();

  const handleTabItemClick = useCallback(
    path => {
      push(path);
    },
    [push]
  );

  return (
    <div className="tab">
      <TabItem
        icon={GiStrong}
        title="Workout"
        path="/"
        isActive={pathname === "/"}
        onClick={handleTabItemClick}
      />
      <TabItem
        icon={FaListUl}
        title="History"
        path="/history"
        isActive={pathname === "/history"}
        onClick={handleTabItemClick}
      />
      <TabItem
        icon={FaRegEdit}
        title="Exercises"
        path="/exercises"
        isActive={pathname === "/exercises"}
        onClick={handleTabItemClick}
      />
      <TabItem
        icon={IoMdSettings}
        title="Settings"
        path="/settings"
        isActive={pathname === "/settings"}
        onClick={handleTabItemClick}
      />
    </div>
  );
};

export default BottomTabNavigation;
