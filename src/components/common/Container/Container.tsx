import React from "react";

import "./container.scss";

interface ContainerProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  fluid?: boolean;
  className?: string;
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({
  fluid,
  className = "",
  children,
  ...props
}) => {
  return (
    <div
      className={`${fluid ? "container-fluid" : "container"} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
