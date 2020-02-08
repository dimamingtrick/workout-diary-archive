import React from "react";

import { Page } from "../../../components/common";
import { useStores } from "../../../hooks";
import { useObserver } from "mobx-react";

const WorkoutPage: React.FC = () => {
  const { WorkoutStore } = useStores();

  return useObserver(() => (
    <Page>
      {WorkoutStore.isRunning ? (
        <button onClick={() => WorkoutStore.stopWorkout()}>Stop workout</button>
      ) : (
        <button onClick={() => WorkoutStore.startWorkout()}>
          Start workout
        </button>
      )}
    </Page>
  ));
};

export default WorkoutPage;
