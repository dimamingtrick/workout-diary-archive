import React, { useCallback } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { useObserver } from "mobx-react";
import { Button } from "antd";

import { Page } from "../../../components/common";
import { ExerciseList } from "../../../components/Exercise";
import { useStores } from "../../../hooks";
import "./workout-page.scss";

const WorkoutPage: React.FC = () => {
  const { push } = useHistory();
  const { url } = useRouteMatch();
  const { WorkoutStore } = useStores();

  const handleStartWorkout = useCallback(() => {
    WorkoutStore.startWorkout();
  }, [WorkoutStore]);

  const handleAddExercise = useCallback(() => {
    WorkoutStore.startNewExercise();
    push(`${url}/current-exercise`);
  }, [WorkoutStore, push, url]);

  return useObserver(() => (
    <Page className={!WorkoutStore.isRunning ? "is-running" : ""}>
      {!WorkoutStore.isRunning && (
        <Button onClick={handleStartWorkout} size="large">
          Start workout
        </Button>
      )}
      {WorkoutStore.isRunning && (
        <>
          <ExerciseList exercises={WorkoutStore.exercises} />
          <Button onClick={handleAddExercise}>Add exercise</Button>
        </>
      )}
    </Page>
  ));
};

export default WorkoutPage;
