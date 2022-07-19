/* --- libs --------------------------------------------------------------------------------------------------------- */
import { atom, RecoilState, useRecoilState } from "recoil";
import { Product } from "../types/Product";

export type Cart = {
  products: Product[];
  totalPrice: number;
};

const initialState: Cart = {
  products: [],
  totalPrice: 0
};

export const cartState: RecoilState<Cart> = atom({
  key: "cartState",
  default: initialState
});

/* --- ロジック ------------------------------------------------------------------------------------------------------- */
export const useCart = () => {
  const [cart, setCart] = useRecoilState(cartState);

  /* --- カートへ商品追加 ----------------------------------------------------------------------------------------------- */
  const addCart = (product: Product): void => {
    const newItem = cart.products.find((_product) => _product.id === product.id);

    // カートに商品が入っていない場合
    if (!newItem) {
      product.quantity = 1;
      setCart({
        products: [...cart.products, product],
        totalPrice: cart.totalPrice + product.price
      });
    } else {
      // カートに商品が入っている場合
      setCart({
        products: cart.products.map((_product) =>
          _product.id === newItem.id ? Object.assign({}, _product, { quantity: _product.quantity + 1 }) : _product
        ),
        totalPrice: cart.totalPrice + product.price
      });
    }
  };

  return { addCart };
};
