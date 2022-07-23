/* --- libs --------------------------------------------------------------------------------------------------------- */
import { NextPage } from "next";
import { useCallback, useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";

/* --- assets ------------------------------------------------------------------------------------------------------- */
import styles from "./payments.module.scss";

/* --- globalState -------------------------------------------------------------------------------------------------- */
import { cartState, totalPriceSelector } from "../../stores/cart";

/* --- components --------------------------------------------------------------------------------------------------- */
import { PaymentControlGroup } from "../../components/organisms/ControlGroups/PaymentsControlGroup/PaymentControlGroup";

/* --- types -------------------------------------------------------------------------------------------------------- */
import { PaymentDataInputValues } from "./pageSettings";
import { Cart } from "../../components/molecules/Cart/Cart";
import { Product } from "../../types/Product";
import { parseCookies } from "nookies";

type Props = {
  cookies: {
    products: Product[];
  };
};

const PaymentsPage: NextPage = (props: Props) => {
  const { cookies } = props;
  const [cart, setCart] = useRecoilState(cartState);
  const totalPrice = useRecoilValue(totalPriceSelector);

  useEffect(() => {
    console.log(cookies.products);
    if (cookies.products.length > 0) {
      setCart({
        products: cookies.products
      });
    }
  }, []);

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
        <div className={styles.totalPrice}>{totalPrice}円</div>
      </div>

      <h2 className={styles.heading}>購入する</h2>
      <PaymentControlGroup className={styles.paymentControlGroup} submitFunction={submit} />
    </div>
  );
};

PaymentsPage.getInitialProps = (ctx) => {
  const cookies = parseCookies(ctx);
  const products: Product[] = JSON.parse({ cookies }.cookies.cart);
  return {
    cookies: products
  };
};

export default PaymentsPage;
