import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import "./Header.css";

type PropsType = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ viewCart, setViewCart }: PropsType) => {
  //if on details navigate to products
  const navigate = useNavigate();
  const { location } = window;
  const { totalItems, totalPrice } = useCart();

  const toggleCart = () => {
    setViewCart((state) => {
      if (location.pathname.includes("product/") && state) {
        navigate("/products");
      }
      return !state;
    });
  };

  const CartButton = (
    <button className="viewCart-btn" onClick={toggleCart}>
      {viewCart ? "View Products" : "View Cart"}
    </button>
  );

  const content = (
    <header className="header">
      <div className="header__title-bar">
        <h1>H&M</h1>
        <div className="header_price-box">
          <p>Total Items: {totalItems}</p>
          <p>Total Price: {totalPrice}</p>
        </div>
        {CartButton}
      </div>
    </header>
  );
  return content;
};

export default Header;
