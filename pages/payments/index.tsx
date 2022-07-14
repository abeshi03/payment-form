/* --- libs --------------------------------------------------------------------------------------------------------- */
import { NextPage } from "next";

/* --- assets ------------------------------------------------------------------------------------------------------- */
import styles from "./payments.module.scss";

/* --- components --------------------------------------------------------------------------------------------------- */
import { PaymentControlGroup } from "../../components/organisms/ControlGroups/PaymentsControlGroup/PaymentControlGroup";
import { SubmitHandler } from "react-hook-form";
import { PaymentDataInputValues } from "./ pageSettings";
import { useCallback } from "react";

const PaymentsPage: NextPage = () => {
  const submit: SubmitHandler<PaymentDataInputValues> = useCallback(async (inputValues) => {
    console.log(inputValues);
  }, []);

  return (
    <div className={styles.paymentsPage}>
      <h1>決済ページ</h1>
      <PaymentControlGroup submitFunction={submit} />
    </div>
  );
};

export default PaymentsPage;
