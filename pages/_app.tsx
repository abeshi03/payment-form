import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Header } from "../components/layouts/Header/Header";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Header />
      <Component {...pageProps} />;
    </RecoilRoot>
  );
}

export default MyApp;
