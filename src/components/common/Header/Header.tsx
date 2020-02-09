import React from "react";

import "./header.scss";

const Header: React.FC<{
  children: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
}> = ({ left, right, children }) => {
  return (
    <div className="page-header">
      <div className="header-left">{left}</div>
      <div className="header-center">{children}</div>
      <div className="header-right">{right}</div>
    </div>
  );
};

export default Header;
