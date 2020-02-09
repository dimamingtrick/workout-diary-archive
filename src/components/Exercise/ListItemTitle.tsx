import React, { memo } from "react";
import { Button } from "antd";

const ListItemTitle: React.FC<{
  className?: string;
  children: React.ReactNode;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}> = ({ className = "", children, onEditClick, onDeleteClick }) => {
  return (
    <div className={`list-item-title ${className}`}>
      {children}
      <div className="actions">
        <Button
          type="primary"
          shape="circle"
          icon="edit"
          size="small"
          onClick={onEditClick}
        />
        <Button
          type="danger"
          shape="circle"
          icon="delete"
          size="small"
          onClick={onDeleteClick}
        />
      </div>
    </div>
  );
};

export default memo(ListItemTitle);
