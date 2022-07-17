/* --- libs --------------------------------------------------------------------------------------------------------- */
import { NextPage } from "next";
import { useCallback } from "react";
import { SubmitHandler } from "react-hook-form";

/* --- assets ------------------------------------------------------------------------------------------------------- */
import styles from "./payments.module.scss";

/* --- components --------------------------------------------------------------------------------------------------- */
import { PaymentControlGroup } from "../../components/organisms/ControlGroups/PaymentsControlGroup/PaymentControlGroup";

/* --- types -------------------------------------------------------------------------------------------------------- */
import { PaymentDataInputValues } from "./pageSettings";
import { useRecoilValue } from "recoil";
import { cartState } from "../../stores/cart";

const PaymentsPage: NextPage = () => {
  const cart = useRecoilValue(cartState);

  const submit: SubmitHandler<PaymentDataInputValues> = useCallback(async (inputValues) => {
    console.log(inputValues);
  }, []);

  const cartItems = () => {
    if (cart.products.length === 0) return <p>カートにアイテムが入っていません</p>;
    return (
      <div className={styles.cartItemsFlow}>
        {cart.products.map((product) => (
          <div key={product.id} className={styles.cartItem}>
            <div
              className={styles.image}
              role="img"
              style={{ backgroundImage: `url(https://dummyimage.com/100x100/03488d/fff})` }}
            ></div>
            <h2 className={styles.name}>{product.name}</h2>
            <p className={styles.price}>{product.price}円</p>
          </div>
        ))}
        <p>合計金額{cart.totalPrice}円</p>
      </div>
    );
  };

  return (
    <div className={styles.paymentsPage}>
      <h2 className={styles.heading}>カート</h2>
      {cartItems()}
      <h2 className={styles.heading}>購入する</h2>
      <PaymentControlGroup className={styles.paymentControlGroup} submitFunction={submit} />
    </div>
  );
};

export default PaymentsPage;
