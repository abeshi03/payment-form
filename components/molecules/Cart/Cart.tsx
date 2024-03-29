/* --- libs --------------------------------------------------------------------------------------------------------- */
import React, { memo, FC } from "react";

/* --- assets ------------------------------------------------------------------------------------------------------- */
import styles from "./Cart.module.scss";

/* --- types --------------------------------------------------------------------------------------------------------- */
import { Product } from "../../../types/Product";

/* --- globalState --------------------------------------------------------------------------------------------------- */
import { useCart } from "../../../stores/cart";

type Props = {
  product: Product;
};

export const Cart: FC<Props> = memo((props) => {
  const { product } = props;

  const { addCart, removeCart } = useCart();

  return (
    <div className={styles.cartItem}>
      <div
        className={styles.image}
        role="img"
        style={{ backgroundImage: `url(https://dummyimage.com/100x100/03488d/fff})` }}
      ></div>
      <h2 className={styles.name}>{product.name}</h2>
      <p className={styles.price}>数量: {product.quantity}</p>
      <div className={styles.countControl}>
        <button className={styles.increment} tabIndex={0} onClick={() => addCart(product)}>
          +
        </button>
        <button className={styles.decrement} tabIndex={0} onClick={() => removeCart(product)}>
          -
        </button>
      </div>
      <p className={styles.price}>{product.price * product.quantity}円</p>
    </div>
  );
});

Cart.displayName = "Cart";
