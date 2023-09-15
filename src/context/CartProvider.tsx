import { useReducer } from "react";
import { useMemo } from "react";
import { createContext } from "react";
import { ReactElement } from "react";
import { useEffect } from "react";

// Define the shape of items in the shopping cart
export type CartItemType = {
  instock: string;
  name: string;
  price: number;
  qty: number;
};

// Define the initial state for the shopping cart
type CartStateType = { cart: CartItemType[] };
const initCartState: CartStateType = { cart: [] };

// Define action types for the cart reducer
const REDUCER_ACTION_TYPE = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  QUANTITY: "QUANTITY",
  SUBMIT: "SUBMIT",
  SET_CART: "SET_CART",
} as const;

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction =
  | { type: "ADD"; payload: CartItemType }
  | { type: "REMOVE"; payload: CartItemType }
  | { type: "QUANTITY"; payload: CartItemType }
  | { type: "SUBMIT" }
  | { type: "SET_CART"; payload: CartItemType[] };
// Define the cart reducer function
const reducer = (
  state: CartStateType,
  action: ReducerAction
): CartStateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD: {
      if (!action.payload) {
        throw new Error("action.payload missing in ADD action");
      }
      // Extract instock, name, and price from payload so you dont have to write action.payload.instock, etc.
      const { instock, name, price } = action.payload;
      // Create a new array by filtering out previous occurrences of the same item in the cart
      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.instock !== instock
      );
      // Search for a matching item in the cart
      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.instock === instock
      );
      // Calculate the new quantity of the item
      const qty: number = itemExists ? itemExists.qty + 1 : 1;
      // Return the new state of the cart
      return {
        ...state,
        cart: [...filteredCart, { instock, name, price, qty }],
      };
    }
    case REDUCER_ACTION_TYPE.REMOVE: {
      if (!action.payload) {
        throw new Error("action.payload missing in REMOVE action");
      }
      const { instock } = action.payload;

      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.instock !== instock
      );
      return { ...state, cart: [...filteredCart] };
    }
    case REDUCER_ACTION_TYPE.QUANTITY: {
      if (!action.payload) {
        throw new Error("action.payload missing in QUANTITY action");
      }

      const { instock, qty } = action.payload;

      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.instock === instock
      );

      if (!itemExists) {
        throw new Error("item must exist in order to update quantity");
      }

      const updatedItem: CartItemType = { ...itemExists, qty };

      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.instock !== instock
      );

      return { ...state, cart: [...filteredCart, updatedItem] };
    }
    case REDUCER_ACTION_TYPE.SUBMIT: {
      return { ...state, cart: [] };
    }

    case REDUCER_ACTION_TYPE.SET_CART: {
      if (Array.isArray(action.payload)) {
        // Check if payload is an array
        // Update the cart state with the loaded data
        return { ...state, cart: action.payload };
      }
      throw new Error("Payload for SET_CART must be an array of CartItemType");
    }

    default:
      throw new Error("Unidentified reducer action type");
  }
};

// Custom hook to provide access to cart state and actions
const useCartHook = (initCartState: CartStateType) => {
  const [state, dispatch] = useReducer(reducer, initCartState);
  console.log("state", state);

  // Define constants to provide access to action types
  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  // Calculate total number of items and total price in the cart
  const totalItems = state.cart.reduce((previousValue, cartItem) => {
    return previousValue + cartItem.qty;
  }, 0);

  // Create a new instance of Intl.NumberFormat to format the total price as currency
  const totalPrice = new Intl.NumberFormat("sv-SE", {
    style: "currency", // Specify the style as currency to format the number as currency
    currency: "SWE", // Specify the currency code for Swedish Krona (SWE)
  }).format(
    // Calculate the total price by iterating over the items in the cart and summing up the individual item prices
    state.cart.reduce((previousValue, cartItem) => {
      return previousValue + cartItem.qty * cartItem.price; // Calculate the subtotal for each item and accumulate the total
    }, 0) // Start the accumulation with an initial value of 0
  );

  // Sort the cart items for display
  const cart = state.cart.sort((a, b) => {
    const itemA = Number(a.instock.slice(-4));
    const itemB = Number(b.instock.slice(-4));
    return itemA - itemB;
  });

  return {
    dispatch,
    REDUCER_ACTIONS,
    cart,
    totalItems,
    totalPrice,
  };
};

export type UseCartContextType = ReturnType<typeof useCartHook>;
const initCartContextState: UseCartContextType = {
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  totalItems: 0,
  totalPrice: "",
  cart: [],
};

// Create the CartContext using createContext
export const CartContext =
  createContext<UseCartContextType>(initCartContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

// Create the CartProvider component to wrap around your application
export const CartProvider = ({ children }: ChildrenType): ReactElement => {
  const { dispatch, cart, ...rest } = useCartHook(initCartState);

  useEffect(() => {
    // Load cart data from local storage on component mount
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      // Parse the cart data and update the cart state
      dispatch({
        type: REDUCER_ACTION_TYPE.SET_CART,
        payload: JSON.parse(savedCart),
      });
    }
  }, []); // Include dispatch in the dependency array

  useEffect(() => {
    // Save the cart data to local storage whenever the cart state changes
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]); // Include cart in the dependency array

  return (
    <CartContext.Provider
      value={{
        dispatch,
        cart,
        ...rest,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
