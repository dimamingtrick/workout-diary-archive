import React from "react";
import { List } from "antd";

import ListItemTitle from "./ListItemTitle";
import ListItemDescription from "./ListItemDescription";
import { Set } from "../../models/workout.model";

const DropSet: React.FC<{ set: Set; number: number }> = ({ set, number }) => {
  return (
    <List.Item className="dropset">
      <List.Item.Meta
        title={
          <ListItemTitle className="dropset__title">{`${number}. Dropset - ${set.weight}kg - ${set.reps}`}</ListItemTitle>
        }
        description={
          <ListItemDescription className="dropset__description">
            {set.comment}
          </ListItemDescription>
        }
      />
    </List.Item>
  );
};

export default DropSet;
