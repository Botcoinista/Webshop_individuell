import { useReducer } from "react";
import { useMemo } from "react";
import { createContext } from "react";
import { ReactElement } from "react";

// Define the shape of items in the shopping cart
export type CartItemType = {
  sku: string;
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
  // SET_CART: "SET_CART",
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction = {
  type: string;
  payload: CartItemType;
};

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
      // Extract SKU, name, and price from payload so you dont have to write action.payload.sku, etc. 
      const { sku, name, price } = action.payload;
      // Create a new array by filtering out previous occurrences of the same item in the cart 
      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.sku !== sku
      );
      // Search for a matching item in the cart
      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.sku === sku
      );
      // Calculate the new quantity of the item
      const qty: number = itemExists ? itemExists.qty + 1 : 1;
      // Return the new state of the cart
      return { ...state, cart: [...filteredCart, { sku, name, price, qty }] };
    }
    case REDUCER_ACTION_TYPE.REMOVE: {
      if (!action.payload) {
        throw new Error("action.payload missing in REMOVE action");
      }
      const { sku } = action.payload;

      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.sku !== sku
      );
      return { ...state, cart: [...filteredCart] };
    }
    case REDUCER_ACTION_TYPE.QUANTITY: {
      if (!action.payload) {
        throw new Error("action.payload missing in QUANTITY action");
      }

      const { sku, qty } = action.payload;

      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.sku === sku
      );

      if (!itemExists) {
        throw new Error("item must exist in order to update quantity");
      }

      const updatedItem: CartItemType = { ...itemExists, qty };

      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.sku !== sku
      );

      return { ...state, cart: [...filteredCart, updatedItem] };
    }
    case REDUCER_ACTION_TYPE.SUBMIT: {
      return { ...state, cart: [] };
    }
    // case REDUCER_ACTION_TYPE.SET_CART: {
    //   if (!action.payload) {
    //     throw new Error("action.payload missing in SET_CART action");
    //   }
    //   return { ...state, cart: action.payload };
    // }
    default:
      throw new Error("Unidentified reducer action type");
  }
};

// Custom hook to provide access to cart state and actions
const useCartContext = (initCartState: CartStateType) => {
  const [state, dispatch] = useReducer(reducer, initCartState);

  // Define constants to provide access to action types
  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  // Calculate total number of items and total price in the cart
  const totalItems = state.cart.reduce((previousValue, cartItem) => {
    return previousValue + cartItem.qty;
  }, 0);

  const totalPrice = new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
  }).format(
    state.cart.reduce((previousValue, cartItem) => {
      return previousValue + cartItem.qty * cartItem.price;
    }, 0)
  );

  // Sort the cart items for display
  const cart = state.cart.sort((a, b) => {
    const itemA = Number(a.sku.slice(-4));
    const itemB = Number(b.sku.slice(-4));
    return itemA - itemB;
  });

  return { dispatch, REDUCER_ACTIONS, cart, totalItems, totalPrice };
};

export type UseCartContextType = ReturnType<typeof useCartContext>;
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
  return (
    <CartContext.Provider value={useCartContext(initCartState)}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext; // Export the CartContext
