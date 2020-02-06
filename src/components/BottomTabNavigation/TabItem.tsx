import React, { useCallback } from "react";
import { IconType } from "react-icons";

const TabItem: React.FC<{
  icon?: IconType;
  title?: string;
  path: string;
  isActive: boolean;
  onClick: (path: string) => void;
}> = ({ icon: IconComponent, title, path = "", isActive = false, onClick }) => {
  const handleClick = useCallback(() => {
    onClick(path);
  }, [onClick, path]);

  return (
    <button
      className={`tab__item ${isActive ? "active" : ""}`}
      onClick={handleClick}
    >
      {IconComponent && <IconComponent size={25} />}
      {title && <div className="tab__title">{title}</div>}
    </button>
  );
};

export default TabItem;
