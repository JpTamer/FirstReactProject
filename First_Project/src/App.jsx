import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Menu from "./Pages/Menu";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Reviews from "./Pages/Reviews";
import About from "./Pages/AboutUs";
import ScrollToTop from "./Components/ScrollToTop"; 
import ContactInfo from "./Pages/ContactInfo";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactInfo />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
