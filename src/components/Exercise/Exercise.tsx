import React, { memo, useState, useCallback, useMemo } from "react";
import { Skeleton, Collapse } from "antd";
import { MdKeyboardArrowDown } from "react-icons/md";

import { Exercise as ExerciseInterface } from "../../models/workout.model";
import ListItemTitle from "./ListItemTitle";
import SetsList from "./SetsList";
import "./exercise.scss";

interface ExerciseProps {
  exercise: ExerciseInterface;
  number: number;
  loading?: boolean;
  showArrow?: boolean;
  isOpen?: (number: number) => boolean | boolean;
  onExerciseEditClick?: (exercise: ExerciseInterface) => void;
  onExerciseDeleteClick?: (exercise: ExerciseInterface) => void;
  onExerciseCollapse?: (openExerciseData: {
    number: number;
    isOpen: boolean;
  }) => void;
}

const Exercise: React.FC<ExerciseProps> = ({
  exercise,
  number,
  loading,
  showArrow = true,
  isOpen = () => false,
  onExerciseEditClick,
  onExerciseDeleteClick,
  onExerciseCollapse
}) => {
  const isCollapsed = useMemo(() => isOpen(number), [isOpen, number]);
  const [open, setOpen] = useState(isCollapsed);

  const handleEditClick = useCallback(() => {
    if (onExerciseEditClick) {
      onExerciseEditClick(exercise);
    }
  }, [onExerciseEditClick, exercise]);

  const handleDeleteClick = useCallback(() => {
    if (onExerciseDeleteClick) {
      onExerciseDeleteClick(exercise);
    }
  }, [onExerciseDeleteClick, exercise]);

  const handleExerciseCollapse = useCallback(
    exerciseNumber => {
      if (onExerciseCollapse) {
        onExerciseCollapse({
          number,
          isOpen: exerciseNumber[1] || false
        });
      }
      setOpen(exerciseNumber[1] || false);
    },
    [onExerciseCollapse, number]
  );

  return (
    <li className="exercise">
      <Collapse
        className="exercise-collapse"
        defaultActiveKey={[isCollapsed ? number : ""]}
        onChange={handleExerciseCollapse}
      >
        <Collapse.Panel
          key={number}
          header={
            <div className="exercise-collapse-header">
              <ListItemTitle
                className="exercise__title"
                onEditClick={handleEditClick}
                onDeleteClick={handleDeleteClick}
              >
                {`${number}) ${exercise.name}`}
              </ListItemTitle>

              {showArrow && (
                <MdKeyboardArrowDown
                  size={25}
                  className={`collapse-icon ${open ? "is-open" : ""} `}
                />
              )}
            </div>
          }
          showArrow={false}
        >
          <Skeleton avatar title={false} loading={loading} active>
            <SetsList sets={exercise.sets} />
          </Skeleton>
        </Collapse.Panel>
      </Collapse>
    </li>
  );
};

export default memo(Exercise);
