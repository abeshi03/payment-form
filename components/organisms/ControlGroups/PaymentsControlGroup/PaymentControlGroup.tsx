/* --- libs --------------------------------------------------------------------------------------------------------- */
import React, { FC, memo, useState } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";

/* --- assets ------------------------------------------------------------------------------------------------------- */
import styles from "./PaymentsControlGroup.module.scss";

/* --- components --------------------------------------------------------------------------------------------------- */
import { InputField } from "../../../molecules/InputField/inputField";

/* --- types -------------------------------------------------------------------------------------------------------- */
import { PaymentDataInputValues } from "../../../../pages/payments/pageSettings";
import { SelectField } from "../../../../libs/ReactSelect";

/* --- validations --------------------------------------------------------------------------------------------------- */
import {
  addressErrorMessages,
  curdNumberErrorMessages,
  dateOfExpiryMonthErrorMessages,
  dateOfExpiryYearErrorMessages,
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
    control,
    formState: { errors }
  } = useForm<PaymentDataInputValues>({
    mode: "onBlur",
    reValidateMode: "onBlur"
  });

  /* ---住所検索 ------------------------------------------------------------------------------------------------------ */
  const [address, setAddress] = useState("");

  const searchAddress = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const postCode = e.target.value;
    if (postCode.length < 7) return;

    const res = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postCode}`);
    const data: { results: { address1: string; address2: string; address3: string }[] } = await res.json();

    if (!data.results) return;

    setAddress(`${data.results[0].address1}${data.results[0].address2}${data.results[0].address3}`);
  };

  /* --- セレクトフィールド --------------------------------------------------------------------------------------------- */
  const currentYear = new Date().getFullYear();
  const yearOptions: SelectField.Option<number>[] = [...Array(10)].map((_, index) => ({
    label: currentYear + index,
    value: currentYear + index
  }));

  const monthOptions: SelectField.Option<number>[] = [...Array(12)].map((_, index) => ({
    label: index + 1,
    value: index + 1
  }));

  /* --- view ------------------------------------------------------------------------------------------------------- */
  return (
    <>
      <form className={`${className} ${styles.paymentControlGroup}`} onSubmit={handleSubmit(submitFunction)}>
        <InputField
          className={styles.inputField}
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

        <div className={styles.dateOfExpiry}>
          <Controller
            control={control}
            name="dateOfExpiry__year"
            rules={{
              required: paymentDataValidations.dateOfExpiry__year.required,
              min: paymentDataValidations.dateOfExpiry__year.min,
              max: paymentDataValidations.dateOfExpiry__year.max
            }}
            render={({ field: { onChange, onBlur, ref } }) => (
              <Select
                instanceId="selectbox"
                placeholder="有効期限(年)"
                options={yearOptions}
                onBlur={onBlur}
                ref={ref}
                onChange={(newSelect) => onChange(newSelect?.value)}
              />
            )}
          />

          <span className={styles.separate}>/</span>

          <Controller
            control={control}
            name="dateOfExpiry__month"
            rules={{
              required: paymentDataValidations.dateOfExpiry__month.required,
              min: paymentDataValidations.dateOfExpiry__month.min,
              max: paymentDataValidations.dateOfExpiry__month.max
            }}
            render={({ field: { onChange, onBlur, ref } }) => (
              <Select
                instanceId="selectbox"
                placeholder="有効期限(月)"
                options={monthOptions}
                onBlur={onBlur}
                ref={ref}
                onChange={(newSelect) => onChange(newSelect?.value)}
              />
            )}
          />
        </div>
        {errors.dateOfExpiry__month && dateOfExpiryMonthErrorMessages(errors.dateOfExpiry__month)}
        {errors.dateOfExpiry__year && dateOfExpiryYearErrorMessages(errors.dateOfExpiry__year)}

        <InputField
          className={styles.inputField}
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

        <div className={styles.nameField}>
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
        </div>

        <InputField
          className={styles.inputField}
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
          className={styles.inputField}
          type="text"
          required={true}
          placeholder="埼玉県〇〇市〇〇1-1-12"
          label="都道府県・市区町村・番地"
          guidance="数字と記号は半角で入力してください"
          inputProps={register("address", {
            required: paymentDataValidations.address.required,
            minLength: paymentDataValidations.address.minLength,
            maxLength: paymentDataValidations.address.maxLength
          })}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {errors.address && addressErrorMessages(errors.address)}

        <button className={styles.submitButton} type="submit">
          送信
        </button>
      </form>
    </>
  );
});

PaymentControlGroup.displayName = "PaymentControlGroup";
