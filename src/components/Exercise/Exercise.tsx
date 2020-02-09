import React from "react";
import { List, Skeleton } from "antd";

import {
  Exercise as ExerciseInterface,
  SetWithDrop as SetWithDropInterface
} from "../../models/workout.model";
import ListItemTitle from "./ListItemTitle";
import Set from "./Set";
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
        <List
          className="sets"
          itemLayout="vertical"
          dataSource={exercise.sets}
          renderItem={(set: SetWithDropInterface, setIndex: number) => (
            <Set set={set} number={setIndex + 1} />
          )}
        />
      </Skeleton>
    </List.Item>
  );
};

export default Exercise;
