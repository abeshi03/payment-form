/* --- libs --------------------------------------------------------------------------------------------------------- */
import { FC, memo } from "react";

/* --- assets ------------------------------------------------------------------------------------------------------- */
import styles from "./PaymentsControlGroup.module.scss";
import { InputField } from "../../../molecules/InputField/inputField";
import { useForm } from "react-hook-form";
import { PaymentDataInputValues } from "../../../../../pages/payments/ pageSettings";
import {
  curdNumberErrorMessages,
  paymentDataValidations,
  securityCodeErrorMessages
} from "../../../../../validations/PaymentValidations";

type Props = {
  className?: string;
  submitFunction: (inputValue: PaymentDataInputValues) => Promise<void>;
};

export const PaymentControlGroup: FC<Props> = memo((props) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PaymentDataInputValues>();

  const { className, submitFunction } = props;

  return (
    <>
      <form className={`${className} ${styles.paymentControlGroup}`} onSubmit={handleSubmit(submitFunction)}>
        <InputField
          label="カード番号"
          placeholder="1111111111111111"
          guidance="半角数字で入力してください(ハイフンなし)"
          type="number"
          required={true}
          inputProps={register("cardNumber", {
            required: paymentDataValidations.curdNumber.required,
            min: paymentDataValidations.curdNumber.min,
            max: paymentDataValidations.curdNumber.max
          })}
        />
        {errors.cardNumber && curdNumberErrorMessages(errors.cardNumber)}

        <InputField
          label="セキュリティコード"
          placeholder="123"
          type="number"
          required={true}
          inputProps={register("securityCode", {
            required: paymentDataValidations.securityCode.required,
            min: paymentDataValidations.securityCode.min,
            max: paymentDataValidations.securityCode.max
          })}
        />
        {errors.securityCode && securityCodeErrorMessages(errors.securityCode)}
        <button type="submit">送信</button>
      </form>
    </>
  );
});

PaymentControlGroup.displayName = "PaymentControlGroup";
