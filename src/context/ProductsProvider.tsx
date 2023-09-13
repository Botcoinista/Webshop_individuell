import  { createContext, ReactElement, useState, useEffect } from "react";

export type ProductType = {
  sku: string;
  name: string;
  price: number;
};


// const initState: ProductType[] = []
const initState: ProductType[] = [
  {
    sku: "item0001",
    name: "Product 1 description",
    price: 100,
  },
  {
    sku: "item0002",
    name: "Product 2 description",
    price: 200,
  },
  {
    sku: "item0003",
    name: "Product 3 description",
    price: 300,
  },  
];

export type UseProductsContextType = { products: ProductType[] };

const initContextState: UseProductsContextType = { products: [] };

const ProductsContext = createContext<UseProductsContextType>(initContextState);

type childrenType = { children?: ReactElement | ReactElement[] };

export const ProductsProvider = ({ children }: childrenType):
    ReactElement => {
        const [products, setProducts] = useState<ProductType[]>(initState)

        // useEffect(() => {
        //     const fetchProducts = async (): Promise<ProductType[]> => {
        //         const data = await fetch("https://localhost:3500/products").then(res => {
        //             return res.json()
        //         }).catch(err => {
        //             if (err instanceof Error) {
        //                 console.log(err.message)
        //             }
        //         }) 
        //         return data
        //     }
        //     fetchProducts().then(products => setProducts(products))
        // }, [])




        return (
            <ProductsContext.Provider value={{ products }}>
                {children}
            </ProductsContext.Provider>
        )
    }

export default ProductsContext