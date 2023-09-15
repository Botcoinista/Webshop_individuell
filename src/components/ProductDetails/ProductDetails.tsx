import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import { Link } from "react-router-dom";
import { ProductType } from "../../context/ProductsProvider";
import useProducts from "../../hooks/useProducts";
import { useEffect, useState } from "react";

// interface ProductDetailsProps extends RouteComponentProps<RouteProps> {}

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>() || { id: "" };
  const products = useProducts();

  const [product, setProduct] = useState<ProductType | undefined>(undefined);

  useEffect(() => {
    if (products.products?.length && id) {
      const product = products.products.find(
        (product) => product.id === parseInt(id, 10)
      );
      setProduct(product);
    }
  }, [products.products, id]);

  if (id === undefined) {
    return <div>Product not found</div>;
  } else {
    if (!product) {
      return <div>Product not found</div>;
    }

    const img: string = new URL(
      `../../images/${product.instock}.jpg`,
      import.meta.url
    ).href;

    return (
      <div className="productdetails-container">
        <h1 className="productdetails_header">Product Details</h1>
        <h2>{product.name}</h2>
        <p className="productdetails-text">
          En huvtröja i bomullsblandad kvalitet. Tröjan har lös passform, fodrad
          huva, <br /> känguruficka och lång ärm. Ribbad mudd vid ärmslut och i
          nederkant. Mjuk, borstad insida.
        </p>
        {/* <button onClick={() => setViewCart(!viewCart)}>Toggle Cart</button> */}
        <img
          src={img}
          alt={product.name}
          className="product__img details_img"
        />
        <Link to={`/`}>
          <button className="backToProducts-btn">Back to Products</button>
        </Link>
        <p>Price: {product.price}</p>
      </div>
    );
  }
};

export default ProductDetails;
