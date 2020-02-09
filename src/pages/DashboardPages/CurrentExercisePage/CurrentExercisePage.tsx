import React, { useState, useCallback } from "react";
import { Input, Button } from "antd";
import { useHistory, Redirect } from "react-router-dom";

import AddSetModalForm from "../../../components/AddSetModalForm";
import { Page } from "../../../components/common";
import { SetsList } from "../../../components/Exercise";
import { useObserver } from "mobx-react";
import { useStores } from "../../../hooks";
import "./current-exercise.scss";

const CurrentExercisePage = () => {
  const { WorkoutStore } = useStores();
  const [visible, setVisible] = useState(false);
  const { push } = useHistory();

  const handleExerciseNameChange = useCallback(
    e => {
      WorkoutStore.setExerciseName(e.target.value);
    },
    [WorkoutStore]
  );

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

  return useObserver(() => {
    if (!WorkoutStore.currentExercise || !WorkoutStore.isRunning) {
      return <Redirect to="/app" />;
    }

    return (
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
        />
        {WorkoutStore.currentExercise && (
          <SetsList sets={WorkoutStore.currentExercise!.sets} />
        )}
        <Button onClick={handleModalOpen}>Add set</Button>
        <Button onClick={handleCompleteExercise}>Complete exercise</Button>
        <Button onClick={handleCancelExercise}>Cancel exercise</Button>
      </Page>
    );
  });
};

export default CurrentExercisePage;
