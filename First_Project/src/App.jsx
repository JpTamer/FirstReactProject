import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Menu from "./Pages/Menu";
import Cart from "./Pages/Cart";
import useCart from "./hooks/useCart.jsx";
import Toast from "./Components/Toast.jsx";
import ScrollToTop from "./Components/ScrollToTop.jsx";
import Reviews from "./Pages/Reviews";
import About from "./Pages/AboutUs";
import ContactInfo from "./Pages/ContactInfo";
function App() {
  const {
    cart,
    notification,
    addToCart,
    incrementCartItem,
    decrementCartItem,
    removeFromCart,
    handleCheckout,
  } = useCart();

  return (
    <Router>
      <ScrollToTop />
      <Toast message={notification} />
      <Navbar cartCount={cart.reduce((acc, cur) => acc + cur.quantity, 0)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactInfo />} />
        <Route path="/menu" element={<Menu addToCart={addToCart} />} />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              onAdd={incrementCartItem}
              onDecrement={decrementCartItem}
              onRemove={removeFromCart}
              onCheckout={handleCheckout}
            />
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
