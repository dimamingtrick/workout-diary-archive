import React, { useState, useCallback, useMemo } from "react";
import { Input, Modal, InputNumber, Form } from "antd";

import { useStores } from "../../hooks";

const AddSetModalForm: React.FC<{
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
}> = ({ visible = false, onCancel, onOk }) => {
  const { WorkoutStore } = useStores();
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState();
  const [comment, setComment] = useState("");

  const formIsValid = useMemo(() => {
    return reps > 0;
  }, [reps]);

  const handleWeightChange = useCallback((weight: number | undefined) => {
    if (weight && typeof weight === "number") {
      setWeight(weight);
    }
  }, []);

  const handleRepsChange = useCallback((reps: number | undefined) => {
    if (reps && typeof reps === "number") {
      setReps(reps);
    }
  }, []);

  const handleCommentChange = useCallback(e => {
    setComment(e.target.value);
  }, []);

  const handleSubmit = () => {
    WorkoutStore.addSet(weight, reps, comment);
    onOk();
  };

  return (
    <Modal
      title="Add set"
      visible={visible}
      onOk={handleSubmit}
      onCancel={onCancel}
      okButtonProps={{ disabled: !formIsValid }}
    >
      <Form onSubmit={handleSubmit}>
        <Form.Item style={{ marginBottom: 0 }}>
          <Form.Item label="Weight" className="exercise-input">
            <InputNumber
              placeholder="Weight in kg"
              autoFocus
              value={weight}
              onChange={handleWeightChange}
            />
          </Form.Item>
          <Form.Item label="Reps" className="exercise-input reps-input">
            <InputNumber
              placeholder="Reps"
              value={reps}
              onChange={handleRepsChange}
            />
          </Form.Item>
        </Form.Item>

        <Form.Item label="Comment">
          <Input.TextArea
            rows={4}
            placeholder="Comment"
            allowClear
            value={comment}
            onChange={handleCommentChange}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddSetModalForm;
