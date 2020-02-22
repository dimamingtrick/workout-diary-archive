import React, { memo } from "react";

interface ListItemDescriptionProps {
  className?: string;
  children: React.ReactNode;
}

const ListItemDescription: React.FC<ListItemDescriptionProps> = ({
  className = "",
  children
}) => {
  return <div className={`list-item-description ${className}`}>{children}</div>;
};

export default memo(ListItemDescription);
