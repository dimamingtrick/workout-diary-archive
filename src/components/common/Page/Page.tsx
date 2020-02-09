import React from "react";
import Container from "../Container/Container";

import "./page.scss";

const Page: React.FC<{ children: any; className?: string }> = ({
  children,
  className
}) => {
  return (
    <Container fluid className={`page ${className ? className : ""}`}>
      {children}
    </Container>
  );
};

export default Page;
