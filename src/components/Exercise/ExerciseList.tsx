import React from "react";
import { List } from "antd";

import { Exercise as ExerciseInterface } from "../../models/workout.model";
import Exercise from "./Exercise";

const ExerciseList: React.FC<{ exercises: ExerciseInterface[] }> = ({
  exercises
}) => {
  return (
    <List
      className="exercise"
      itemLayout="horizontal"
      dataSource={exercises}
      renderItem={(exercise: ExerciseInterface, exerciseIndex: number) => (
        <Exercise exercise={exercise} number={exerciseIndex + 1} />
      )}
      locale={{
        emptyText: "No exercises yet"
      }}
    />
  );
};

export default ExerciseList;
