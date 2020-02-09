import React from "react";
import { List } from "antd";

import Set from "./Set";
import { SetWithDrop as SetWithDropInterface } from "../../models/workout.model";

const SetsList: React.FC<{ sets: SetWithDropInterface[] }> = ({ sets }) => {
  return (
    <List
      className="sets"
      itemLayout="vertical"
      dataSource={sets}
      renderItem={(set: SetWithDropInterface, setIndex: number) => (
        <Set set={set} number={setIndex + 1} />
      )}
      locale={{
        emptyText: "No sets yet"
      }}
    />
  );
};

export default SetsList;
