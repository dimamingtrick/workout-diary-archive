import React, { useCallback } from "react";

import { useStores } from "../../hooks";
import "./header.scss";
import { useObserver } from "mobx-react";

const BottomTabNavigation: React.FC = () => {
  const { AuthStore, WorkoutStore } = useStores();

  const handleLogout = useCallback(() => {
    AuthStore.logout();
  }, [AuthStore]);

  return useObserver(() => (
    <div className="header">
      <button onClick={handleLogout}>Logout</button>
      <span>{WorkoutStore.timer}</span>
    </div>
  ));
};

export default BottomTabNavigation;
