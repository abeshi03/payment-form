/* --- libs --------------------------------------------------------------------------------------------------------- */
import React, { FC, memo, useState } from "react";

/* --- assets ------------------------------------------------------------------------------------------------------- */
import styles from "./PaymentsControlGroup.module.scss";
import { InputField } from "../../../molecules/InputField/inputField";
import { useForm } from "react-hook-form";
import { PaymentDataInputValues } from "../../../../pages/payments/ pageSettings";
import {
  addressErrorMessages,
  curdNumberErrorMessages,
  paymentDataValidations,
  postCodeErrorMessages,
  securityCodeErrorMessages
} from "../../../../validations/PaymentValidations";

type Props = {
  className?: string;
  submitFunction: (inputValue: PaymentDataInputValues) => Promise<void>;
};

export const PaymentControlGroup: FC<Props> = memo((props) => {
  const { className, submitFunction } = props;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PaymentDataInputValues>();

  const [address, setAddress] = useState("");

  const searchAddress = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const postCode = e.target.value;
    if (postCode.length < 7) return;

    const res = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postCode}`);
    const data: { results: { address1: string; address2: string; address3: string }[] } = await res.json();

    if (!data.results) return;

    setAddress(`${data.results[0].address1}${data.results[0].address2}${data.results[0].address3}`);
  };

  /* --- view ------------------------------------------------------------------------------------------------------- */
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

        <InputField
          type="text"
          required={true}
          guidance="半角英字で入力してください"
          placeholder="TARO"
          label="カード名義(名)"
          inputProps={register("givenName", {
            required: paymentDataValidations.name.required,
            minLength: paymentDataValidations.name.minLength,
            maxLength: paymentDataValidations.name.maxLength,
            pattern: paymentDataValidations.name.pattern
          })}
        />

        <InputField
          type="text"
          required={true}
          guidance="半角英字で入力してください"
          placeholder="TANAKA"
          label="カード名義(妙)"
          inputProps={register("familyName", {
            required: paymentDataValidations.name.required,
            minLength: paymentDataValidations.name.minLength,
            maxLength: paymentDataValidations.name.maxLength,
            pattern: paymentDataValidations.name.pattern
          })}
        />

        <InputField
          type="number"
          label="郵便番号"
          placeholder="1111111"
          required={true}
          inputProps={register("postCode", {
            required: paymentDataValidations.postCode.required,
            min: paymentDataValidations.postCode.min,
            max: paymentDataValidations.postCode.max
          })}
          onChange={(e) => searchAddress(e)}
        />
        {errors.postCode && postCodeErrorMessages(errors.postCode)}

        <InputField
          type="text"
          required={true}
          placeholder="埼玉県〇〇市〇〇1-1-12"
          label="都道府県・市区町村・番地"
          guidance="数字と記号は半角で入力してください"
          defaultValue={address}
          inputProps={register("address", {
            required: paymentDataValidations.address.required,
            minLength: paymentDataValidations.address.minLength,
            maxLength: paymentDataValidations.address.maxLength
          })}
        />
        {errors.address && addressErrorMessages(errors.address)}

        <button type="submit">送信</button>
      </form>
    </>
  );
});

PaymentControlGroup.displayName = "PaymentControlGroup";
