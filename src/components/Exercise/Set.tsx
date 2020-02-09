import React from "react";
import { List } from "antd";

import DropSet from "./DropSet";
import ListItemTitle from "./ListItemTitle";
import ListItemDescription from "./ListItemDescription";
import { SetWithDrop } from "../../models/workout.model";

const Set: React.FC<{ set: SetWithDrop; number: number }> = ({
  set,
  number
}) => {
  return (
    <List.Item className="set">
      <List.Item.Meta
        title={
          <ListItemTitle className="set__title">{`${number}. ${set.weight}kg - ${set.reps}`}</ListItemTitle>
        }
        description={
          set.comment && (
            <ListItemDescription className="set__description">
              {set.comment}
            </ListItemDescription>
          )
        }
      />
      {set.dropSets && (
        <List
          className="dropsets"
          itemLayout="horizontal"
          dataSource={set.dropSets}
          renderItem={(set: SetWithDrop, setIndex: number) => (
            <DropSet set={set} number={setIndex + 1} />
          )}
        />
      )}
    </List.Item>
  );
};

export default Set;
