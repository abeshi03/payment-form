/* --- libs --------------------------------------------------------------------------------------------------------- */
import { FC, memo } from "react";

/* --- globalState -------------------------------------------------------------------------------------------------- */
import { useCart } from "../../../stores/cart";

/* --- assets ------------------------------------------------------------------------------------------------------- */
import styles from "./ProductCard.module.scss";

/* --- types --------------------------------------------------------------------------------------------------------- */
import { Product } from "../../../types/Product";

type Props = {
  product: Product;
};

export const ProductCard: FC<Props> = memo((props) => {
  const { product } = props;

  const { addCart } = useCart();

  return (
    <div className={styles.productCard}>
      <div
        className={styles.image}
        role="img"
        style={{ backgroundImage: `url(https://dummyimage.com/100x100/03488d/fff})` }}
      ></div>
      <h2 className={styles.name}>{product.name}</h2>
      <p className={styles.price}>{product.price}円</p>
      <button onClick={() => addCart(product)} className={styles.button}>
        カードに入れる
      </button>
    </div>
  );
});

ProductCard.displayName = "ProductCard";
