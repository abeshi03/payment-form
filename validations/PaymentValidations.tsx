/* --- libs ---------------------------------------------------------------------------------------------------------- */
import { FieldError } from "react-hook-form";

export const paymentDataValidations = {
  curdNumber: {
    required: true,
    min: 12,
    max: 16
  }
};

export const curdNumberErrorMessages = (error: FieldError) => {
  switch (error.type) {
    case "required":
      return "カード番号は必須です";

    case "minLength":
      return `${paymentDataValidations.curdNumber.min}以上で入力してください`;

    case "maxLength":
      return `${paymentDataValidations.curdNumber.max}以内で入力してください`;
  }
};
