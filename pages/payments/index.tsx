/* --- libs --------------------------------------------------------------------------------------------------------- */
import { NextPage } from "next";
import { useCallback } from "react";
import { SubmitHandler } from "react-hook-form";
import { useRecoilValue } from "recoil";

/* --- assets ------------------------------------------------------------------------------------------------------- */
import styles from "./payments.module.scss";

/* --- globalState -------------------------------------------------------------------------------------------------- */
import { cartState } from "../../stores/cart";

/* --- components --------------------------------------------------------------------------------------------------- */
import { PaymentControlGroup } from "../../components/organisms/ControlGroups/PaymentsControlGroup/PaymentControlGroup";

/* --- types -------------------------------------------------------------------------------------------------------- */
import { PaymentDataInputValues } from "./pageSettings";
import { Cart } from "../../components/molecules/Cart/Cart";

const PaymentsPage: NextPage = () => {
  const cart = useRecoilValue(cartState);

  const submit: SubmitHandler<PaymentDataInputValues> = useCallback(async (inputValues) => {
    console.log(inputValues);
  }, []);

  return (
    <div className={styles.paymentsPage}>
      <h2 className={styles.heading}>カート</h2>

      <div className={styles.cartItemsFlow}>
        {cart.products.length === 0 && <p>カートにアイテムが入っていません</p>}
        {cart.products.map((product) => (
          <Cart product={product} key={product.id} />
        ))}
        <div className={styles.totalPrice}>{cart.totalPrice}円</div>
      </div>

      <h2 className={styles.heading}>購入する</h2>
      <PaymentControlGroup className={styles.paymentControlGroup} submitFunction={submit} />
    </div>
  );
};

export default PaymentsPage;
