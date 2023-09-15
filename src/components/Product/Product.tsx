import { ProductType } from "../../context/ProductsProvider";
import { ReactElement } from "react";
import { Link } from "react-router-dom";
import "./Product.css";
import useCart from "../../hooks/useCart";

type PropsType = {
  product: ProductType;
  inCart: boolean;
};

const Product = ({ product, inCart }: PropsType): ReactElement => {
  const cart = useCart();
  const img: string = new URL(
    `../../images/${product.instock}.jpg`,
    import.meta.url
  ).href;
  // console.log(img);
  const onAddToCart = () => {
    // Dispatch the ADD action to add the product to the cart
    cart.dispatch({
      type: cart.REDUCER_ACTIONS.ADD,
      payload: { ...product, qty: 1 },
    });
    // Save the updated cart data to localStorage

    // Construct the product details URL
  };

  const itemInCart = inCart ? " ➡️ Item in Cart: ✅" : null;

  const content = (
    <article className="product">
      <h3>{product.name}</h3>
      <Link to={`/product/${product.id}`}>
        <img src={img} alt={product.name} className="product__img" />
      </Link>
      <p>
        {new Intl.NumberFormat("sv-SE", {
          style: "currency",
          currency: "SWE",
        }).format(product.price)}
        {itemInCart}
      </p>
      <Link to={`/products/`}>
        <button className="addToCart-btn" onClick={onAddToCart}>
          Add to Cart
        </button>
      </Link>
      <Link to={`/product/${product.id}`}>
        <button className="productDetails-btn">Product Details</button>
      </Link>
    </article>
  );

  return content;
};

export default Product;
