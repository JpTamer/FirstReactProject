import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Menu from "./Pages/Menu";
import Cart from "./Pages/Cart";
import OrderProgress from "./Pages/OrderProgress.jsx";
import useCart from "./hooks/useCart.jsx";
import Toast from "./Components/Toast.jsx";
import ScrollToTop from "./Components/ScrollToTop.jsx";
import Reviews from "./Pages/Reviews";
import About from "./Pages/AboutUs";
import ContactInfo from "./Pages/ContactInfo";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import MyOrders from "./Pages/MyOrders";
import { AuthProvider } from "./context/AuthContext";
import { FaShoppingCart } from "react-icons/fa";

function FloatingCartButton({ cart }) {
  const location = useLocation();
  
  // Only show on menu page and mobile view
  if (location.pathname !== '/menu') {
    return null;
  }

  return (
    <Link
      to="/cart"
      className="md:hidden fixed bottom-6 right-6 bg-[#D4AF37] hover:bg-[#C5A028] text-[#0F1E13] p-4 rounded-full shadow-lg z-50 transition-all transform hover:scale-110"
    >
      <FaShoppingCart className="text-2xl" />
      {cart.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
          {cart.reduce((acc, cur) => acc + cur.quantity, 0)}
        </span>
      )}
    </Link>
  );
}

function AppContent() {
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
      {/* it allows you to reduce an entire array into one value. */}
      <Navbar cartCount={cart.reduce((acc, cur) => acc + cur.quantity, 0)} />
      
      {/* Floating Cart Button - Mobile Only on Menu Page */}
      <FloatingCartButton cart={cart} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
        <Route path="/order-progress" element={<OrderProgress />} />
        <Route path="/my-orders" element={<MyOrders />} />
      </Routes>
      <Footer />
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
