import React from "react";

import Set from "./Set";
import { SetWithDrop as SetWithDropInterface } from "../../models/workout.model";

interface SetListProps {
  sets: SetWithDropInterface[];
  showEditIcon?: boolean;
  showDeleteIcon?: boolean;
  onSetEditClick?: (set: SetWithDropInterface) => void;
  onSetDeleteClick?: (set: SetWithDropInterface) => void;
}

const SetsList: React.FC<SetListProps> = ({
  sets,
  showEditIcon = false,
  showDeleteIcon = false,
  onSetEditClick,
  onSetDeleteClick
}) => {
  return (
    <ul className="sets">
      {sets.map((set: SetWithDropInterface, setIndex: number) => (
        <Set
          key={`set-${setIndex}`}
          set={set}
          onSetEditClick={onSetEditClick}
          onSetDeleteClick={onSetDeleteClick}
          number={setIndex + 1}
          showEditIcon={showEditIcon}
          showDeleteIcon={showDeleteIcon}
        />
      ))}
    </ul>
  );
};

export default SetsList;
