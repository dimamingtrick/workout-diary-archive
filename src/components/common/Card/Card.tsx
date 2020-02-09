import React from "react";
import { Col } from "antd";
import styles from "./card.module.scss";

interface CardProps {
  className?: string;
  children?: any;
}

export const Card: React.FC<CardProps> = ({
  className = "",
  children = null
}) => {
  return (
    <Col md={12} xs={24} className={`${styles.card} ${className}`}>
      <div className="content">{children}</div>
    </Col>
  );
};

interface CardTitleProps {
  children: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({ children = "" }) => (
  <div className={styles.cardTitle}>
    <span>{children}</span>
  </div>
);

export default Card;
