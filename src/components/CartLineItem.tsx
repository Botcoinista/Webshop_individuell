import { ChangeEvent, ReactElement, memo } from "react";
import { CartItemType } from "../context/CartProvider";
import useCart from "../hooks/useCart";

type PropsType = {
  item: CartItemType;
};

const CartLineItem = ({ item }: PropsType) => {
  const cart = useCart();
  const img: string = new URL(`../images/${item.instock}.jpg`, import.meta.url)
    .href;

  const lineTotal: number = item.price * item.qty;

  const highestQty: number = 10 > item.qty ? 10 : item.qty;

  const optionValues: number[] = [...Array(highestQty).keys()].map(
    (i) => i + 1
  );

  const options: ReactElement[] = optionValues.map((val) => {
    return (
      <option key={`opt${val}`} value={val}>
        {val}
      </option>
    );
  });

  const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
    cart.dispatch({
      type: cart.REDUCER_ACTIONS.QUANTITY,
      payload: { ...item, qty: Number(e.target.value) },
    });
  };

  const onRemoveFromCart = () =>
    cart.dispatch({
      type: cart.REDUCER_ACTIONS.REMOVE,
      payload: item,
    });

  const content = (
    <li className="cart__item">
      <img src={img} alt={item.name} className="cart__img" />
      <div aria-label="Item Name">{item.name}</div>
      <div aria-label="Price Per Item">
        {new Intl.NumberFormat("se-SV", {
          style: "currency",
          currency: "SWE",
        }).format(item.price)}
      </div>

      <label htmlFor="itemQty" className="offscreen">
        Item Quantity
      </label>
      <select
        name="itemQty"
        id="itemQty"
        className="cart__select"
        value={item.qty}
        aria-label="Item Quantity"
        onChange={onChangeQty}
      >
        {options}
      </select>

      <div className="cart__item-subtotal" aria-label="Line Item Subtotal">
        {new Intl.NumberFormat("se-SV", {
          style: "currency",
          currency: "SWE",
        }).format(lineTotal)}
      </div>

      <button
        className="cart__button"
        aria-label="Remove Item From Cart"
        title="Remove Item From Cart"
        onClick={onRemoveFromCart}
      >
        ❌
      </button>
    </li>
  );

  return content;
};

function areItemsEqual(
  { item: prevItem }: PropsType,
  { item: nextItem }: PropsType
) {
  return Object.keys(prevItem).every((key) => {
    return (
      prevItem[key as keyof CartItemType] ===
      nextItem[key as keyof CartItemType]
    );
  });
}

const MemoizedCartLineItem = memo<typeof CartLineItem>(
  CartLineItem,
  areItemsEqual
);

export default MemoizedCartLineItem;
