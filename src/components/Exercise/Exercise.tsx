import React, { memo } from "react";
import { List, Skeleton } from "antd";

import { Exercise as ExerciseInterface } from "../../models/workout.model";
import ListItemTitle from "./ListItemTitle";
import SetsList from "./SetsList";
import "./exercise.scss";

const Exercise: React.FC<{
  exercise: ExerciseInterface;
  number: number;
  loading?: boolean;
}> = ({ exercise, number, loading }) => {
  return (
    <List.Item className="exercise">
      <Skeleton avatar title={false} loading={loading} active>
        <List.Item.Meta
          title={
            <ListItemTitle className="exercise__title">{`${number}) ${exercise.name}`}</ListItemTitle>
          }
        />
        <SetsList sets={exercise.sets} />
      </Skeleton>
    </List.Item>
  );
};

export default memo(Exercise);
