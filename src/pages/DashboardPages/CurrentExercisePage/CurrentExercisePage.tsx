import React, { useState, useCallback } from "react";
import { Input, Button, Icon } from "antd";
import { useHistory, Redirect } from "react-router-dom";
import { useObserver } from "mobx-react";

import AddSetModalForm from "../../../components/AddSetModalForm";
import { Page, Header } from "../../../components/common";
import { SetsList } from "../../../components/Exercise";
import { useStores } from "../../../hooks";
import "./current-exercise.scss";
import { SetWithDrop } from "../../../models/workout.model";

const CurrentExercisePage = () => {
  const { WorkoutStore } = useStores();
  const [selectedSet, setSelectedSet] = useState<SetWithDrop | null>(null);
  const [visible, setVisible] = useState(false);
  const { push } = useHistory();

  const handleExerciseNameChange = useCallback(
    e => {
      WorkoutStore.setExerciseName(e.target.value);
    },
    [WorkoutStore]
  );

  const handleGoToWorkoutPage = useCallback(() => {
    push("/app");
  }, [push]);

  const handleModalOpen = useCallback(() => {
    setVisible(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setVisible(false);
  }, []);

  const handleAddSet = useCallback(() => {
    setVisible(false);
  }, []);

  const handleCompleteExercise = useCallback(() => {
    WorkoutStore.completeExercise();
    push("/app");
  }, [WorkoutStore, push]);

  const handleCancelExercise = useCallback(() => {
    WorkoutStore.cancelExercise();
    push("/app");
  }, [WorkoutStore, push]);

  const handleEditSet = useCallback((set: SetWithDrop) => {
    setSelectedSet(set);
    setVisible(true);
  }, []);

  return useObserver(() => {
    if (!WorkoutStore.currentExercise || !WorkoutStore.isRunning) {
      return <Redirect to="/app" />;
    }

    return (
      <>
        <Header>
          <Button type="link" onClick={handleGoToWorkoutPage}>
            <Icon type="left" />
            Workout
          </Button>
        </Header>
        <Page>
          <Input
            size="large"
            placeholder="Exercise"
            value={WorkoutStore.currentExercise?.name}
            onChange={handleExerciseNameChange}
          />
          <AddSetModalForm
            visible={visible}
            onCancel={handleModalClose}
            onOk={handleAddSet}
            set={selectedSet}
          />
          {WorkoutStore.currentExercise && (
            <SetsList
              sets={WorkoutStore.currentExercise!.sets}
              onSetEditClick={handleEditSet}
            />
          )}
          <Button className="add-set-button" onClick={handleModalOpen}>
            Add set
          </Button>
        </Page>
        <div className="exercise-actions">
          <Button type="danger" onClick={handleCancelExercise}>
            Cancel exercise
          </Button>
          <Button type="primary" onClick={handleCompleteExercise}>
            Complete exercise
          </Button>
        </div>
      </>
    );
  });
};

export default CurrentExercisePage;
