import React, { useCallback } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { useObserver } from "mobx-react";
import { Button } from "antd";

import { Page, Header } from "../../../components/common";
import { ExerciseList } from "../../../components/Exercise";
import { useStores } from "../../../hooks";
import { Exercise } from "../../../models/workout.model";
import "./workout-page.scss";

const WorkoutPage: React.FC = () => {
  const { push } = useHistory();
  const { url } = useRouteMatch();
  const { WorkoutStore } = useStores();

  const handleStartWorkout = useCallback(() => {
    WorkoutStore.startWorkout();
  }, [WorkoutStore]);

  const handleAddExercise = useCallback(() => {
    if (!WorkoutStore.currentExercise) {
      WorkoutStore.startNewExercise();
    }
    push(`${url}/current-exercise`);
  }, [WorkoutStore, push, url]);

  const handleEditExercise = useCallback(
    (exercise: Exercise) => {
      WorkoutStore.editExercise(exercise);
      push(`${url}/current-exercise`);
    },
    [WorkoutStore, push, url]
  );

  const handleDeleteExercise = useCallback(
    (exercise: Exercise) => {
      WorkoutStore.deleteExercise(exercise);
    },
    [WorkoutStore]
  );

  const handleExerciseCollapse = useCallback(
    (openExerciseData: { number: number; isOpen: boolean }) => {
      WorkoutStore.toggleOpenExercise(openExerciseData);
    },
    [WorkoutStore]
  );

  const getOpenExercises = useCallback(
    (number: number) => {
      return WorkoutStore.openExercises.find(i => i === number) &&
        WorkoutStore.isRunning
        ? true
        : false;
    },
    [WorkoutStore]
  );

  return useObserver(() => (
    <>
      <Header left="Workout" />
      <Page className={!WorkoutStore.isRunning ? "is-running" : ""}>
        {!WorkoutStore.isRunning && (
          <Button onClick={handleStartWorkout} size="large">
            Start workout
          </Button>
        )}
        {WorkoutStore.isRunning && (
          <>
            <ExerciseList
              exercises={WorkoutStore.exercises}
              onExerciseEditClick={handleEditExercise}
              onExerciseDeleteClick={handleDeleteExercise}
              isOpen={getOpenExercises}
              onExerciseCollapse={handleExerciseCollapse}
            />
            <Button className="add-exercise-btn" onClick={handleAddExercise}>
              {WorkoutStore.currentExercise?.name
                ? `Continue current exercise (${WorkoutStore.currentExercise.name})`
                : "Add exercise"}
            </Button>
          </>
        )}
      </Page>
    </>
  ));
};

export default WorkoutPage;
