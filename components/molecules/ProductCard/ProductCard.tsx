/* --- libs --------------------------------------------------------------------------------------------------------- */
import { FC, memo } from "react";
import styles from "./ProductCard.module.scss";
import { Product } from "../../../types/Product";
import { useRecoilState } from "recoil";
import { cartState } from "../../../stores/cart";

type Props = {
  product: Product;
};

export const ProductCard: FC<Props> = memo((props) => {
  const { product } = props;

  const [cart, setCart] = useRecoilState(cartState);

  const addToCart = (product: Product): void => {
    const newItem = cart.products.find((_product) => _product.id === product.id);

    if (!newItem) {
      product.quantity = 1;
      setCart({
        products: [...cart.products, product],
        totalPrice: cart.totalPrice + product.price
      });
    } else {
      setCart({
        products: cart.products.map((_product) =>
          _product.id === newItem.id
            ? {
                ...product,
                quantity: _product.quantity + 1
              }
            : product
        ),
        totalPrice: cart.totalPrice + product.price
      });
    }
  };

  return (
    <div className={styles.productCard}>
      <div
        className={styles.image}
        role="img"
        style={{ backgroundImage: `url(https://dummyimage.com/100x100/03488d/fff})` }}
      ></div>
      <h2 className={styles.name}>{product.name}</h2>
      <p className={styles.price}>{product.price}円</p>
      <button onClick={() => addToCart(product)} className={styles.button}>
        カードに入れる
      </button>
    </div>
  );
});

ProductCard.displayName = "ProductCard";
