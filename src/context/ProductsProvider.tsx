// Import necessary modules and types from React
import { createContext, ReactElement, useState, useEffect } from "react";

// Define a type for a single product
export type ProductType = {
  id: number;
  instock: string;
  name: string;
  price: number;
  img: string;
};

// Define an extended type that includes additional properties for storing in local storage
export interface ProductLocalStorageType extends ProductType {
  qty: number;
  description: string;
}

// Initial state for the list of products, filled with example data
const initState: ProductType[] = [
  {
    instock: "item0001",
    name: "Product 1 description",
    price: 100,
    id: 1,
    img: "",
  },
  {
    instock: "item0002",
    name: "Product 2 description",
    price: 200,
    id: 2,
    img: "",
  },
  {
    instock: "item0003",
    name: "Product 3 description",
    price: 300,
    id: 3,
    img: "",
  },
];

// Define a type for the context data
export type UseProductsContextType = { products: ProductType[] };

// Initial context state with an empty product list
const initContextState: UseProductsContextType = { products: [] };

// Create a context for managing products
const ProductsContext = createContext<UseProductsContextType>(initContextState);

// Define a type for the children prop
type childrenType = { children?: ReactElement | ReactElement[] };

// Create a provider component to wrap around the application
export const ProductsProvider = ({ children }: childrenType): ReactElement => {
  // Use state to manage the product list, initialized with the example data
  const [products, setProducts] = useState<ProductType[]>(initState);

  // Uncomment this section to fetch products from an API (requires network access)
  /*
  useEffect(() => {
    const fetchProducts = async (): Promise<ProductType[]> => {
      try {
        const response = await fetch("https://localhost:3500/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        return data;
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
        }
        return [];
      }
    };

    fetchProducts().then((products) => setProducts(products));
  }, []);
  */

  // Provide the product data to the context
  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
