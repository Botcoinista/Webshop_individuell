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
    
    const img: string = new URL(`../images/${productData.sku}.jpg`, import.meta.url)
    .href;

    return (
      <div>
        <h1>Product Details</h1>
        <h2>{productData.name}</h2>
        <p>En huvtröja i bomullsblandad sweatshirtkvalitet. Tröjan har lös passform, fodrad huva, <br/> känguruficka och lång ärm. Ribbad mudd vid ärmslut och i nederkant. Mjuk, borstad insida.</p>
        <img src={img} alt={productData.name} className="product__img" />
        <p>Price: {productData.price}</p>
      </div>
    );
  }
};

export default ProductDetails;
