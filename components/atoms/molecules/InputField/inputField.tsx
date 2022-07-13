/* --- lib ------------------------------------------------------------------ */
import React, { memo, FC } from "react";

/* --- assets --------------------------------------------------------------- */
import styles from "./inputField.module.scss";

/* --- component ------------------------------------------------------------ */
import { InputLabel } from "../../InputLabel/InputLabel";

type InputFiledType = "text" | "password" | "email" | "number";

type Props = {
  label?: string;
  placeholder?: string;
  type: InputFiledType;
  required: boolean;
  guidance?: string;
  disabled?: boolean;
  defaultValue?: string | number;
  autoComplete?: string;
  className?: string;
  inputProps: React.HTMLAttributes<HTMLInputElement>;
};

export const InputField: FC<Props> = memo((props) => {
  const {
    label,
    placeholder,
    type,
    required,
    guidance,
    disabled = false,
    defaultValue,
    autoComplete,
    className,
    inputProps
  } = props;

  return (
    <div className={styles.inputFieldContainer}>
      <InputLabel required={required} label={label} />

      <input
        {...inputProps}
        className={`${className} ${styles.inputField}`}
        defaultValue={defaultValue}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autoComplete}
      />
      {guidance && <p className={styles.guidance}>{guidance}</p>}
    </div>
  );
});

InputField.displayName = "InputField";
