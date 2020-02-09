import React, { memo } from "react";
import { Button } from "antd";

const ListItemTitle: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className = "", children }) => {
  return (
    <div className={`list-item-title ${className}`}>
      {children}
      <div className="actions">
        <Button type="primary" shape="circle" icon="edit" size="small" />
        <Button type="danger" shape="circle" icon="delete" size="small" />
      </div>
    </div>
  );
};

export default memo(ListItemTitle);
