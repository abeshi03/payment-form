/* --- libs --------------------------------------------------------------------------------------------------------- */
import { NextPage } from "next";

/* --- assets ------------------------------------------------------------------------------------------------------- */
import styles from "./payments.module.scss";

/* --- components --------------------------------------------------------------------------------------------------- */
import { PaymentControlGroup } from "../../components/organisms/ControlGroups/PaymentsControlGroup/PaymentControlGroup";
import { SubmitHandler } from "react-hook-form";
import { PaymentDataInputValues } from "./pageSettings";
import { useCallback } from "react";

const PaymentsPage: NextPage = () => {
  const submit: SubmitHandler<PaymentDataInputValues> = useCallback(async (inputValues) => {
    console.log(inputValues);
  }, []);

  return (
    <div className={styles.paymentsPage}>
      <h1 className={styles.heading}>決済ページ</h1>
      <PaymentControlGroup className={styles.paymentControlGroup} submitFunction={submit} />
    </div>
  );
};

export default PaymentsPage;
