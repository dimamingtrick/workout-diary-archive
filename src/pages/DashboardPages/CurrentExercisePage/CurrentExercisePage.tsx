import React, { useState, useCallback } from "react";
import { Input, Button, Icon } from "antd";
import { useHistory, Redirect } from "react-router-dom";
import { useObserver } from "mobx-react";

import AddSetModalForm from "../../../components/AddSetModalForm";
import { Page, Header } from "../../../components/common";
import { SetsList } from "../../../components/Exercise";
import { useStores } from "../../../hooks";
import { SetWithDrop } from "../../../models/workout.model";
import "./current-exercise.scss";

const CurrentExercisePage: React.FC = () => {
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
    setSelectedSet(null);
    setVisible(false);
  }, []);

  const handleCompleteExercise = useCallback(() => {
    WorkoutStore.completeExercise();
    push("/app");
    setTimeout(() => {
      document.querySelector(".workout-page")?.scrollTo({
        top: 10000,
        behavior: "smooth"
      });
    });
  }, [WorkoutStore, push]);

  const handleCancelExercise = useCallback(() => {
    WorkoutStore.cancelExercise();
    push("/app");
  }, [WorkoutStore, push]);

  const handleEditSet = useCallback((set: SetWithDrop) => {
    setSelectedSet(set);
    setVisible(true);
  }, []);

  const handleDeleteSet = useCallback(
    (set: SetWithDrop) => {
      WorkoutStore.deleteSet(set);
    },
    [WorkoutStore]
  );

  return useObserver(() => {
    if (!WorkoutStore.currentExercise || !WorkoutStore.isRunning) {
      return <Redirect to="/app" />;
    }

    return (
      <>
        <Header
          left={
            <Button
              className="back-button"
              type="link"
              onClick={handleGoToWorkoutPage}
            >
              <Icon type="left" />
              Workout
            </Button>
          }
        />
        <Page className="current-exercise-page">
          <Input
            size="large"
            placeholder="Exercise"
            value={WorkoutStore.currentExercise?.name}
            onChange={handleExerciseNameChange}
          />
          <AddSetModalForm
            visible={visible}
            onCancel={handleModalClose}
            onOk={handleModalClose}
            set={selectedSet}
          />
          {WorkoutStore.currentExercise && (
            <SetsList
              sets={WorkoutStore.currentExercise!.sets}
              showEditIcon
              showDeleteIcon
              onSetEditClick={handleEditSet}
              onSetDeleteClick={handleDeleteSet}
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
          <Button
            type="primary"
            className="complete-exercise-btn"
            onClick={handleCompleteExercise}
            disabled={!WorkoutStore.currentExercise.name}
          >
            Complete exercise
          </Button>
        </div>
      </>
    );
  });
};

export default CurrentExercisePage;
