import React from "react";

import { Exercise as ExerciseInterface } from "../../models/workout.model";
import Exercise from "./Exercise";

interface ExerciseListProps {
  isOpen?: (number: number) => boolean | boolean;
  exercises: ExerciseInterface[];
  onExerciseEditClick?: (exercies: ExerciseInterface) => void;
  onExerciseDeleteClick?: (exercies: ExerciseInterface) => void;
  onExerciseCollapse?: (openExerciseData: {
    number: number;
    isOpen: boolean;
  }) => void;
}

const ExerciseList: React.FC<ExerciseListProps> = ({
  isOpen,
  exercises,
  onExerciseEditClick,
  onExerciseDeleteClick,
  onExerciseCollapse
}) => {
  return (
    <ul className="exercises">
      {exercises.map((exercise: ExerciseInterface, exerciseIndex: number) => (
        <Exercise
          key={exercise.name + exercise.id}
          exercise={exercise}
          number={exerciseIndex + 1}
          onExerciseEditClick={onExerciseEditClick}
          onExerciseDeleteClick={onExerciseDeleteClick}
          isOpen={isOpen}
          onExerciseCollapse={onExerciseCollapse}
        />
      ))}
    </ul>
  );
};

export default ExerciseList;
