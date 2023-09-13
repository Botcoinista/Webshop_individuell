import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import { useState } from "react";
import ProductDetails from "./components/ProductDetails";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  const [viewCart, setViewCart] = useState<boolean>(false);

  const pageContent = viewCart ? <Cart /> : <ProductList />;

  return (
    <Router>
      <Header viewCart={viewCart} setViewCart={setViewCart} />
      <Routes>
        <Route path="/products" element={pageContent} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
      <Footer viewCart={viewCart} />
    </Router>
  );
};

export default App;
