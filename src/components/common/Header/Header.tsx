import React from "react";
import { useObserver } from "mobx-react";

import { useStores } from "../../../hooks";
import "./header.scss";

const Header: React.FC<{
  left?: React.ReactNode;
  right?: React.ReactNode;
}> = ({ left, right }) => {
  const { WorkoutStore } = useStores();

  return useObserver(() => (
    <div className="header">
      <div className="header__left">{left}</div>
      <div className="header__center">{WorkoutStore.timer}</div>
      <div className="header__right">{right}</div>
    </div>
  ));
};

export default Header;
