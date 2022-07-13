/* --- libs --------------------------------------------------------------------------------------------------------- */
import { FC, memo } from "react";

/* --- assets ------------------------------------------------------------------------------------------------------- */
import styles from "./PaymentsControlGroup.module.scss";
import { InputField } from "../../../molecules/InputField/inputField";
import { useForm } from "react-hook-form";
import { PaymentDataInputValues } from "../../../../../pages/payments/ pageSettings";
import { curdNumberErrorMessages, paymentDataValidations } from "../../../../../validations/PaymentValidations";

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
          guidance="半角数字で入力してください(ハイフンなし)"
          type="number"
          required={true}
          inputProps={register("cardNumber", {
            required: true,
            min: paymentDataValidations.curdNumber.min,
            max: paymentDataValidations.curdNumber.max
          })}
        />
        {errors.cardNumber && curdNumberErrorMessages(errors.cardNumber)}
        <button type="submit">送信</button>
      </form>
    </>
  );
});

PaymentControlGroup.displayName = "PaymentControlGroup";
