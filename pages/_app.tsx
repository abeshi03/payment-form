import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Header } from "../components/layouts/Header/Header";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { useEffect } from "react";
import { Cart, cartState, totalPriceSelector } from "../stores/cart";
import { Cookies } from "next/dist/server/web/spec-extension/cookies";
import { parseCookies } from "nookies";

function MyApp({ Component, pageProps }: AppProps) {
  const [cart, setCart] = useRecoilState(cartState);

  useEffect(() => {
    const cookies = parseCookies();
    const cartCookie: Cart | undefined = JSON.parse({ cookies }.cookies.cart);
    if (cartCookie) {
      setCart(cartCookie);
    }
  }, [cart]);

  return (
    <RecoilRoot>
      <Header />
      <Component {...pageProps} />;
    </RecoilRoot>
  );
}

export default MyApp;
