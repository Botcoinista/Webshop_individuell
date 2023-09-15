import useProducts from "../hooks/useProducts";
import { ReactElement } from "react";
import Product from "./Product/Product";
import useCart from "../hooks/useCart";

const ProductList = () => {
  const { products } = useProducts();
  const { cart } = useCart();

  let pageContent: ReactElement | ReactElement[] = <p>Loading...</p>;

  if (products?.length) {
    pageContent = products.map((product) => {
      const inCart: boolean = cart.some(
        (item) => item.instock === product.instock
      );

      return (
        <Product key={product.instock} product={product} inCart={inCart} />
      );
    });
  }

  const content = <main className="main main--products">{pageContent}</main>;

  return content;
};

export default ProductList;
