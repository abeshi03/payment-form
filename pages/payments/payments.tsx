import { NextPage } from "next";
import styles from "./payments.module.scss";

const PaymentsPage: NextPage = () => {
  return (
    <div className={styles.paymentsPage}>
      <h1>決済ページ</h1>
    </div>
  );
};

export default PaymentsPage;
