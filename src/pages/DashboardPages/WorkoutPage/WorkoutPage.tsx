import React, { useCallback } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { useObserver } from "mobx-react";
import { List, Button } from "antd";

import { Page } from "../../../components/common";
import { Exercise } from "../../../components/Exercise";
import { Exercise as ExerciseInterface } from "../../../models/workout.model";
import { useStores } from "../../../hooks";
import "./workout-page.scss";

const exercises: Array<ExerciseInterface> = [
  {
    name: "Squat",
    sets: [
      {
        weight: 100,
        reps: 10,
        comment: "That was pretty easy, can do more"
      },
      {
        weight: 100,
        reps: 10
      },
      {
        weight: 100,
        reps: 10,
        comment: "That set was the vest set in my life",
        dropSets: [
          {
            weight: 50,
            reps: 20,
            comment: "FUcking hell"
          },
          {
            weight: 20,
            reps: 20,
            comment: "Easy can do more"
          }
        ]
      }
    ]
  },
  {
    name: "Dips",
    sets: [
      {
        weight: 75,
        reps: 5,
        comment: "I can do a lot more dips"
      },
      {
        weight: 75,
        reps: 5,
        dropSets: [
          {
            weight: 0,
            reps: 50
          }
        ],
        comment: "Hard as fuck"
      }
    ]
  },
  {
    name: "Squat",
    sets: [
      {
        weight: 100,
        reps: 10,
        comment: "That was pretty easy, can do more"
      },
      {
        weight: 100,
        reps: 10
      },
      {
        weight: 100,
        reps: 10,
        comment: "That set was the vest set in my life",
        dropSets: [
          {
            weight: 50,
            reps: 20,
            comment: "FUcking hell"
          },
          {
            weight: 20,
            reps: 20,
            comment: "Easy can do more"
          }
        ]
      }
    ]
  }
];

const WorkoutPage: React.FC = () => {
  const { push } = useHistory();
  const { url } = useRouteMatch();
  const { WorkoutStore } = useStores();

  const handleStartWorkout = useCallback(() => {
    WorkoutStore.startWorkout();
  }, [WorkoutStore]);

  return useObserver(() => (
    <Page className={!WorkoutStore.isRunning ? "is-running" : ""}>
      {!WorkoutStore.isRunning && (
        <Button color="success" onClick={handleStartWorkout} size="large">
          Start workout
        </Button>
      )}
      <button onClick={() => push(`${url}/current-exercise`)}>
        go to curr
      </button>
      {WorkoutStore.isRunning && (
        <List
          className="exercise"
          itemLayout="horizontal"
          dataSource={exercises}
          renderItem={(exercise: ExerciseInterface, exerciseIndex: number) => (
            <Exercise exercise={exercise} number={exerciseIndex + 1} />
          )}
        />
      )}
    </Page>
  ));
};

export default WorkoutPage;
