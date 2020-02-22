import React, { memo, useCallback } from "react";

import DropSetsList from "./DropSetsList";
import ListItemTitle from "./ListItemTitle";
import ListItemDescription from "./ListItemDescription";
import { SetWithDrop } from "../../models/workout.model";

interface SetProps {
  set: SetWithDrop;
  number: number;
  showEditIcon?: boolean;
  showDeleteIcon?: boolean;
  onSetEditClick?: (set: SetWithDrop) => void;
  onSetDeleteClick?: (set: SetWithDrop) => void;
}

const Set: React.FC<SetProps> = ({
  set,
  number,
  showEditIcon = false,
  showDeleteIcon = false,
  onSetEditClick,
  onSetDeleteClick
}) => {
  const handleEditClick = useCallback(() => {
    if (onSetEditClick) {
      onSetEditClick(set);
    }
  }, [onSetEditClick, set]);

  const handleDeleteClick = useCallback(() => {
    if (onSetDeleteClick) {
      onSetDeleteClick(set);
    }
  }, [onSetDeleteClick, set]);

  return (
    <li className="set">
      <ListItemTitle
        className="set__title"
        showEditIcon={showEditIcon}
        showDeleteIcon={showDeleteIcon}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      >
        {`${number}. ${set.weight}kg - ${set.reps}`}
      </ListItemTitle>

      {set.comment && (
        <ListItemDescription className="set__description">
          {set.comment}
        </ListItemDescription>
      )}

      {set.dropSets && <DropSetsList sets={set.dropSets} />}
    </li>
  );
};

export default memo(Set);
