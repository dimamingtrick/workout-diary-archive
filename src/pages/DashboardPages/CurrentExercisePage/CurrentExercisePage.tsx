import React, { useState, useCallback } from "react";
import { Input, Button } from "antd";

import AddSetModalForm from "../../../components/AddSetModalForm";
import { Page } from "../../../components/common";
import { SetsList } from "../../../components/Exercise";
import { useObserver } from "mobx-react";
import { useStores } from "../../../hooks";
import "./current-exercise.scss";

const CurrentExercisePage = () => {
  const { WorkoutStore } = useStores();
  const [visible, setVisible] = useState(false);

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

  return useObserver(() => (
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
    </Page>
  ));
};

export default CurrentExercisePage;
