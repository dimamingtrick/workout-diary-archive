import React from "react";
import Container from "../Container/Container";

import "./page.scss";

interface PageProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children: any;
  className?: string;
}

const Page: React.FC<PageProps> = ({ children, className, ...props }) => {
  return (
    <Container
      fluid
      className={`page ${className ? className : ""}`}
      {...props}
    >
      {children}
    </Container>
  );
};

export default Page;
