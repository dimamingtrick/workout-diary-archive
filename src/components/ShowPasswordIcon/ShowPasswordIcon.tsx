import React, { memo } from "react";
import { GoEyeClosed, GoEye } from "react-icons/go";

import styles from "./showPasswordIcon.module.css";

interface ShowPasswordIconProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  show: boolean;
  onClick: () => void;
}

const ShowPasswordIcon: React.FC<ShowPasswordIconProps> = ({
  show = false,
  onClick = () => {}
}) => (
  <button className={styles.passwordIconBtn} onClick={onClick}>
    {show ? <GoEye /> : <GoEyeClosed />}
  </button>
);

export default memo(ShowPasswordIcon);
