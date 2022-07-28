/* --- libs --------------------------------------------------------------------------------------------------------- */
import type { AppProps } from "next/app";
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { parseCookies, setCookie } from "nookies";

/* --- globalState --------------------------------------------------------------------------------------------------- */
import { Cart, cartState } from "../stores/cart";

/* --- assets ------------------------------------------------------------------------------------------------------- */
import "../styles/globals.css";

/* --- components --------------------------------------------------------------------------------------------------- */
import { Header } from "../components/layouts/Header/Header";

/**
 * リロードした際にglobalStateがリセットされるので、Cookiesに値が存在すればglobalStateを更新する
 * RecoilRoot内ではないとuseSetRecoilStateが使えない為、別関数で定義
 */
function InitApp() {
  const setCart = useSetRecoilState(cartState);

  useEffect(() => {
    const cookies = parseCookies();

    if (cookies.cart !== undefined) {
      const cookiesCart: Cart = JSON.parse(cookies.cart);

      if (cookiesCart.products.length > 0) {
        setCart({
          products: cookiesCart.products
        });
      }
    }
  }, [setCart]);
  return null;
}

/**
 * カートが更新されたらクッキーに値を保存する
 * InitApp同様に定義すると無限ループが起きる為、別関数で定義
 */
function WatchCart() {
  const cart = useRecoilValue(cartState);

  useEffect(() => {
    setCookie(null, "cart", JSON.stringify(cart));
  }, [cart]);
  return null;
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Header />
      <Component {...pageProps} />;
      <InitApp />
      <WatchCart />
    </RecoilRoot>
  );
}

export default MyApp;
