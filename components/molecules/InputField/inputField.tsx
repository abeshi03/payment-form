/* --- lib ------------------------------------------------------------------ */
import React, { memo, FC } from "react";

/* --- assets --------------------------------------------------------------- */
import styles from "./inputField.module.scss";

/* --- component ------------------------------------------------------------ */
import { InputLabel } from "../../atoms/InputLabel/InputLabel";

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
  value?: string;
  inputProps: React.HTMLAttributes<HTMLInputElement>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
    onChange,
    value,
    inputProps
  } = props;

  return (
    <div className={`${className} ${styles.inputFieldContainer}`}>
      <InputLabel required={required} label={label} />

      <input
        {...inputProps}
        onChange={onChange}
        value={value}
        className={styles.inputField}
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
