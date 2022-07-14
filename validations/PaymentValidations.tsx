/* --- libs ---------------------------------------------------------------------------------------------------------- */
import { FieldError } from "react-hook-form";
import { ErrorMessage } from "../components/atoms/ErrorMessage/ErrorMessage";

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
  },
  postCode: {
    required: true,
    min: 1000000,
    max: 9999999
  },
  address: {
    required: true,
    minLength: 5,
    maxLength: 100
  }
};

export const curdNumberErrorMessages = (error: FieldError) => {
  switch (error.type) {
    case "required":
      return <ErrorMessage message="カード番号は必須です" />;

    case "min":
      return <ErrorMessage message="12 ~ 16桁で入力してください" />;

    case "max":
      return <ErrorMessage message="12 ~ 16桁で入力してください" />;
  }
};

export const securityCodeErrorMessages = (error: FieldError) => {
  switch (error.type) {
    case "required":
      return <ErrorMessage message="セキュリティコードは必須です" />;

    case "min":
      return <ErrorMessage message="3 ~ 4桁で入力してください" />;

    case "max":
      return <ErrorMessage message="3 ~ 4桁で入力してください" />;
  }
};

export const postCodeErrorMessages = (error: FieldError) => {
  switch (error.type) {
    case "required":
      return <ErrorMessage message="郵便番号は必須です" />;

    case "min":
      return <ErrorMessage message="7桁で入力してください" />;

    case "max":
      return <ErrorMessage message="7桁で入力してください" />;
  }
};

export const addressErrorMessages = (error: FieldError) => {
  switch (error.type) {
    case "required":
      return <ErrorMessage message="住所は必須です" />;

    case "min":
      return <ErrorMessage message={`住所は必須は${paymentDataValidations.address.minLength}以上で入力してください`} />;

    case "max":
      return <ErrorMessage message={`住所は必須は${paymentDataValidations.address.maxLength}以内で入力してください`} />;
  }
};
