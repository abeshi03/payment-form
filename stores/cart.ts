/* --- libs --------------------------------------------------------------------------------------------------------- */
import { atom, RecoilState, selector, useRecoilState } from "recoil";

/* --- types --------------------------------------------------------------------------------------------------------- */
import { Product } from "../types/Product";

/* --- components ---------------------------------------------------------------------------------------------------- */
import { Cart } from "../components/molecules/Cart/Cart";

export type Cart = {
  products: Product[];
};

const initialState: Cart = {
  products: []
};

export const cartState: RecoilState<Cart> = atom({
  key: "cartState",
  default: initialState
});

export const totalPriceSelector = selector({
  key: "totalPriceSelector",
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.products.reduce((sum, product) => {
      return sum + product.price * product.quantity;
    }, 0);
  }
});

/* --- ロジック ------------------------------------------------------------------------------------------------------- */
export const useCart = () => {
  const [cart, setCart] = useRecoilState(cartState);

  /* --- カートへ商品追加 ----------------------------------------------------------------------------------------------- */
  const addCart = (product: Product): void => {
    const selectItem = cart.products.find((_product) => _product.id === product.id);

    // カートに商品が入っていない場合
    if (!selectItem) {
      product.quantity = 1;
      setCart({
        products: [...cart.products, product]
      });
    } else {
      // カートに商品が入っている場合
      setCart({
        products: cart.products.map((_product) =>
          _product.id === selectItem.id ? Object.assign({}, _product, { quantity: _product.quantity + 1 }) : _product
        )
      });
    }
  };

  const removeCart = (product: Product) => {
    const selectItem = cart.products.find((_product) => _product.id === product.id);

    if (!selectItem) {
      console.warn("selectItemがundefinedのはずがない, バグの可能性あり");
      return;
    }

    // カートから商品を-1する
    if (selectItem.quantity > 1) {
      setCart({
        products: cart.products.map((_product) =>
          _product.id === selectItem.id ? Object.assign({}, _product, { quantity: _product.quantity - 1 }) : _product
        )
      });
    } else {
      // カートから商品を削除する
      const products = [...cart.products];
      const index = products.findIndex((product) => product.id === selectItem.id);
      if (index === -1) return;
      products.splice(index, 1);

      setCart({
        products
      });
    }
  };

  return { addCart, removeCart };
};
