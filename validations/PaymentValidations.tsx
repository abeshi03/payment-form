/* --- libs ---------------------------------------------------------------------------------------------------------- */
import { FieldError } from "react-hook-form";

export const paymentDataValidations = {
  curdNumber: {
    required: true,
    min: 100000000000,
    // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
    max: 9999999999999999
  },
  securityCode: {
    required: true,
    min: 100,
    max: 9999
  },
  name: {
    required: true,
    minLength: 1,
    maxLength: 50,
    pattern: /^[a-zA-Z]+$/
  }
};

export const curdNumberErrorMessages = (error: FieldError) => {
  switch (error.type) {
    case "required":
      return "カード番号は必須です";

    case "min":
      return "12 ~ 16桁で入力してください";

    case "max":
      return "12 ~ 16桁で入力してください";
  }
};

export const securityCodeErrorMessages = (error: FieldError) => {
  switch (error.type) {
    case "required":
      return "セキュリティコードは必須です";

    case "min":
      return "3 ~ 4桁で入力してください";

    case "max":
      return "3 ~ 4桁で入力してください";
  }
};
