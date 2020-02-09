import React from "react";

import "./container.scss";

const Container: React.FC<{
  fluid?: boolean;
  className?: string;
  children: React.ReactNode;
}> = ({ fluid, className = "", children }) => {
  return (
    <div className={`${fluid ? "container-fluid" : "container"} ${className}`}>
      {children}
    </div>
  );
};

export default Container;
