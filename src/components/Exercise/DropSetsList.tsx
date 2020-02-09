import React from "react";
import { List } from "antd";

import DropSet from "./DropSet";
import { SetWithDrop } from "../../models/workout.model";

const DropSetsList: React.FC<{ sets: SetWithDrop[] }> = ({ sets }) => {
  return (
    <List
      className="dropsets"
      itemLayout="horizontal"
      dataSource={sets}
      renderItem={(set: SetWithDrop, setIndex: number) => (
        <DropSet set={set} number={setIndex + 1} />
      )}
    />
  );
};

export default DropSetsList;
