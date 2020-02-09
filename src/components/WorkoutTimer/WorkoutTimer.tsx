import React from "react";

import { useStores } from "../../hooks";
import "./workout-timer.scss";
import { useObserver } from "mobx-react";

const WorkoutTimer: React.FC = () => {
  const { WorkoutStore } = useStores();

  return useObserver(() => (
    <div className="header">
      <span>{WorkoutStore.timer}</span>
    </div>
  ));
};

export default WorkoutTimer;
