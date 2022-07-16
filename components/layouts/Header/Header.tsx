import { FC, memo } from "react";
import styles from "./Header.module.scss";
import { useRecoilValue } from "recoil";
import { cartState } from "../../../stores/cart";

export const Header: FC = memo(() => {
  const cart = useRecoilValue(cartState);
  console.log(cart);
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.cart}>
          <span>カート</span>
          {cart.products.length >= 1 && <span className={styles.count}>{cart.products.length}</span>}
        </div>
      </div>
    </header>
  );
});

Header.displayName = "Header";
