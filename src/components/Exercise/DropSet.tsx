import React, { memo } from "react";

import ListItemTitle from "./ListItemTitle";
import ListItemDescription from "./ListItemDescription";
import { Set } from "../../models/workout.model";

interface DropSetProps {
  set: Set;
  number: number;
}

const DropSet: React.FC<DropSetProps> = ({ set, number }) => {
  return (
    <li className="dropset">
      <ListItemTitle
        showEditIcon={false}
        showDeleteIcon={false}
        className="dropset__title"
      >
        {`${number}. Dropset - ${set.weight}kg - ${set.reps}`}
      </ListItemTitle>
      {set.comment && (
        <ListItemDescription className="dropset__description">
          {set.comment}
        </ListItemDescription>
      )}
    </li>
  );
};

export default memo(DropSet);
