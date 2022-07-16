/* --- libs --------------------------------------------------------------------------------------------------------- */
import { NextPage } from "next";
import { useEffect, useState } from "react";

/* --- assets -------------------------------------------------------------------------------------------------------- */
import styles from "./Home.module.scss";

/* --- types --------------------------------------------------------------------------------------------------------- */
import { Product } from "../types/Product";

/* --- components ---------------------------------------------------------------------------------------------------- */
import { ProductCard } from "../components/molecules/ProductCard/ProductCard";

const Home: NextPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    const res = await fetch("http://localhost:3004/products");
    const products = await res.json();
    setProducts(products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className={styles.home}>
      <h1 className={styles.heading}>商品一覧</h1>

      <div className={styles.cardsFlow}>
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
