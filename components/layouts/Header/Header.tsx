/* --- libs --------------------------------------------------------------------------------------------------------- */
import { FC, memo } from "react";
import { useRecoilValue } from "recoil";
import Link from "next/link";

/* --- assets ------------------------------------------------------------------------------------------------------- */
import styles from "./Header.module.scss";

/* --- globalState -------------------------------------------------------------------------------------------------- */
import { cartState } from "../../../stores/cart";

export const Header: FC = memo(() => {
  const cart = useRecoilValue(cartState);
  console.log(cart);

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
