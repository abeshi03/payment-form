/* --- libs ---------------------------------------------------------------------------------------------------------- */
import { FieldError } from "react-hook-form";
import { ErrorMessage } from "../components/atoms/ErrorMessage/ErrorMessage";

export const paymentDataValidations = {
  curdNumber: {
    required: true,
    pattern: /^\d{12,16}$/
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
  },
  dateOfExpiry__year: {
    required: true,
    min: new Date().getFullYear(),
    max: new Date().getFullYear() + 10
  },
  dateOfExpiry__month: {
    required: true,
    min: 1,
    max: 12
  }
};

export const curdNumberErrorMessages = (error: FieldError) => {
  switch (error.type) {
    case "required":
      return <ErrorMessage message="カード番号は必須です" />;

    case "pattern":
      return <ErrorMessage message="12 ~ 16桁の数字で入力してください" />;
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

    case "minLength":
      return <ErrorMessage message={`住所は必須は${paymentDataValidations.address.minLength}以上で入力してください`} />;

    case "maxLength":
      return <ErrorMessage message={`住所は必須は${paymentDataValidations.address.maxLength}以内で入力してください`} />;
  }
};

export const dateOfExpiryYearErrorMessages = (error: FieldError) => {
  switch (error.type) {
    case "required":
      return <ErrorMessage message="有効期限は必須です" />;

    case "min":
      return <ErrorMessage message={`年は${paymentDataValidations.dateOfExpiry__year.min}以上で入力してください`} />;

    case "max":
      return <ErrorMessage message={`年は${paymentDataValidations.dateOfExpiry__year.min}以内で入力してください`} />;
  }
};

export const dateOfExpiryMonthErrorMessages = (error: FieldError) => {
  switch (error.type) {
    case "required":
      return <ErrorMessage message="有効期限は必須です" />;

    case "min":
      return <ErrorMessage message={`月は${paymentDataValidations.dateOfExpiry__month.min}以上で入力してください`} />;

    case "max":
      return <ErrorMessage message={`月は${paymentDataValidations.dateOfExpiry__month.min}以内で入力してください`} />;
  }
};
