  import useCart from "../hooks/useCart";

type PropsType = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ viewCart, setViewCart }: PropsType) => {
    const { totalItems, totalPrice } = useCart()

    const button = viewCart ? (
      <button onClick={() => setViewCart(false)}>View Products</button> 
    ) : (
      <button onClick={() => setViewCart(true)}>View cart</button>
    );

  const content = (
    <header className="header">
      <div className="header__title-bar">
        <h1>H&M</h1>
        <div className="header_price-box">
          <p>Total Items: {totalItems}</p>
          <p>Total Price: {totalPrice}</p>
        </div>   
        {button}
      </div>
    </header>
  );
  return content;
};

export default Header;
