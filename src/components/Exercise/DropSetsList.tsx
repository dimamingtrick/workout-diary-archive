import React from "react";

import DropSet from "./DropSet";
import { SetWithDrop } from "../../models/workout.model";

interface DropSetsListProps {
  sets: SetWithDrop[];
}

const DropSetsList: React.FC<DropSetsListProps> = ({ sets }) => {
  return (
    <ul className="dropsets">
      {sets.map((set: SetWithDrop, setIndex: number) => (
        <DropSet key={`dropset-${set.id}`} set={set} number={setIndex + 1} />
      ))}
    </ul>
  );
};

export default DropSetsList;
