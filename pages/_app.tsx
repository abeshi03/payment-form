/* --- libs --------------------------------------------------------------------------------------------------------- */
import type { AppProps } from "next/app";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { parseCookies } from "nookies";

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
    let cookiesCart: Cart;

    if ({ cookies }.cookies.cart !== undefined) {
      cookiesCart = JSON.parse({ cookies }.cookies.cart);

      if (cookiesCart.products.length > 0) {
        setCart({
          products: cookiesCart.products
        });
      }
    }
  }, [setCart]);
  return null;
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Header />
      <Component {...pageProps} />;
      <InitApp />
    </RecoilRoot>
  );
}

export default MyApp;
