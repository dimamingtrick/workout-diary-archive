import React, { useCallback, memo } from "react";
import { Button } from "antd";

interface ListItemTitleProps {
  className?: string;
  children: React.ReactNode;
  showEditIcon?: boolean;
  showDeleteIcon?: boolean;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}

const ListItemTitle: React.FC<ListItemTitleProps> = ({
  className = "",
  children,
  showEditIcon = true,
  showDeleteIcon = true,
  onEditClick = () => {},
  onDeleteClick = () => {}
}) => {
  const handleEditClick = useCallback(
    event => {
      event.preventDefault();
      event.stopPropagation();
      onEditClick();
    },
    [onEditClick]
  );

  const handleDeleteClick = useCallback(
    event => {
      event.preventDefault();
      event.stopPropagation();
      onDeleteClick();
    },
    [onDeleteClick]
  );

  return (
    <div className={`list-item-title ${className}`}>
      {children}
      <div className="actions">
        {showEditIcon && (
          <Button
            type="primary"
            shape="circle"
            icon="edit"
            size="small"
            onClick={handleEditClick}
          />
        )}
        {showDeleteIcon && (
          <Button
            type="danger"
            shape="circle"
            icon="delete"
            size="small"
            onClick={handleDeleteClick}
          />
        )}
      </div>
    </div>
  );
};

export default memo(ListItemTitle);
