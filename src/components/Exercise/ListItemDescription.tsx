import React, { memo } from "react";

const ListItemDescription: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className = "", children }) => {
  return <div className={`list-item-description ${className}`}>{children}</div>;
};

export default memo(ListItemDescription);
