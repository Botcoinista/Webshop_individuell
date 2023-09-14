import { useParams } from "react-router-dom";
import { ProductLocalStorageType } from "../context/ProductsProvider"; // Make sure to import ProductLocalStorageType

interface RouteProps {
  id?: string;
}

// interface ProductDetailsProps extends RouteComponentProps<RouteProps> {}

const ProductDetails = (): React.ReactElement => {
  const { id } = useParams<{ id: string }>() || { id: "" };

  if (id === undefined) {
    return <div>Product not found</div>;
  } else {
    const productData: ProductLocalStorageType | undefined = JSON.parse(
      localStorage.getItem("product") || "[]"
    ).find(
      (product: ProductLocalStorageType) => product.id === parseInt(id, 10)
    );

    if (!productData) {
      return <div>Product not found</div>;
    }

    return (
      <div>
        <h1>Product Details</h1>
        <h2>{productData.name}</h2>
        <p>{productData.description}</p>
        <p>Price: {productData.price}</p>
        {/* Display other product details as needed */}
      </div>
    );
  }
};

export default ProductDetails;
