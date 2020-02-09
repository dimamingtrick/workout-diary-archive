import React, { useCallback } from "react";
import { IconType } from "react-icons";

const TabItem: React.FC<{
  icon?: IconType;
  title?: string;
  path: string;
  isActive: boolean;
  className?: string;
  onClick: (path: string) => void;
}> = ({
  icon: IconComponent,
  title,
  path = "",
  isActive = false,
  className,
  onClick
}) => {
  const handleClick = useCallback(() => {
    onClick(path);
  }, [onClick, path]);

  return (
    <button
      className={`tab__item ${isActive ? "active" : ""} ${
        className ? className : ""
      }`}
      onClick={handleClick}
    >
      {IconComponent && <IconComponent size={18} />}
      {title && <div className="tab__title">{title}</div>}
    </button>
  );
};

export default TabItem;
