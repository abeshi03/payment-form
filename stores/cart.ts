/* --- libs --------------------------------------------------------------------------------------------------------- */
import { atom, RecoilState } from "recoil";
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
