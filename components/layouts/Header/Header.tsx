import { FC, memo } from "react";
import styles from "./Header.module.scss";
import { useRecoilValue } from "recoil";
import { cartState } from "../../../stores/cart";
import Link from "next/link";

export const Header: FC = memo(() => {
  const cart = useRecoilValue(cartState);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link className={styles.cart} href={"/payments"}>
            <a>
              <span>カート</span>
              {cart.products.length >= 1 && <span className={styles.count}>{cart.products.length}</span>}
            </a>
          </Link>
        </div>
      </header>
    </>
  );
});

Header.displayName = "Header";
