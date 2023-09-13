import { ProductType } from "../context/ProductsProvider";
import { ReducerActionType, ReducerAction } from "../context/CartProvider";
import { ReactElement } from "react";
import { Link } from "react-router-dom";

type PropsType = {
  product: ProductType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
  inCart: boolean;
};

const Product = ({
  product,
  dispatch,
  REDUCER_ACTIONS,
  inCart,
}: PropsType): ReactElement => {
  const img: string = new URL(`../images/${product.sku}.jpg`, import.meta.url)
    .href;
  console.log(img);

  const onAddToCart = () => {
    // Dispatch the ADD action to add the product to the cart
    dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...product, qty: 1 } });

    // Save the updated cart data to localStorage
    const updatedCart = JSON.parse(localStorage.getItem("product") || "[]");
    /*The { ...product, qty: 1 } 
     syntax creates a new object based on the product object
      but with an additional property qty set to 1. This
       represents the product being added to the cart with a quantity of 1.*/
    updatedCart.push({ ...product, qty: 1, id: product.id });
    localStorage.setItem("product", JSON.stringify(updatedCart));
  };

  const itemInCart = inCart ? " ➡️ Item in Cart: ✅" : null;

  const content = (
    <article className="product">
      <h3>{product.name}</h3>
      <img src={img} alt={product.name} className="product__img" />
      <p>
        {new Intl.NumberFormat("sv-SE", {
          style: "currency",
          currency: "SWE",
        }).format(product.price)}
        {itemInCart}
      </p>
      <button onClick={onAddToCart}>Add to Cart</button>
      <Link to={"/products/{product.id}"}>
      <button>Product Details</button>
      </Link>
    </article>
  );

  return content;
};

export default Product;
