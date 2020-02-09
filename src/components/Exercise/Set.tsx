import React, { memo } from "react";
import { List } from "antd";

import DropSetsList from "./DropSetsList";
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
      {set.dropSets && <DropSetsList sets={set.dropSets} />}
    </List.Item>
  );
};

export default memo(Set);
