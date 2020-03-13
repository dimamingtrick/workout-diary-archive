import React, { useEffect } from "react";
import { useStores } from "../../../hooks";
import { useObserver } from "mobx-react";

const WorkoutHistoryPage = () => {
  const { WorkoutHistoryStore } = useStores();

  useEffect(() => {
    WorkoutHistoryStore.getWorkoutHistory();
  }, [WorkoutHistoryStore]);

  return useObserver(() => (
    <div>
      <span>WorkoutHistoryPage</span>
      {console.log(WorkoutHistoryStore.workouts)}
    </div>
  ));
};

export default WorkoutHistoryPage;
