/* --- libs ---------------------------------------------------------------------------------------------------------- */
import React, { memo, FC } from "react";

/* --- assets -------------------------------------------------------------------------------------------------------- */
import styles from "./ErrorMessage.module.scss";

type Props = {
  message: string;
};

export const ErrorMessage: FC<Props> = memo((props) => {
  const { message } = props;

  return <span className={styles.errorMessage}>{message}</span>;
});

ErrorMessage.displayName = "ErrorMessage";
