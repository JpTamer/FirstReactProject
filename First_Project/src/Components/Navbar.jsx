import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUtensils, FaShoppingCart } from "react-icons/fa";
import Logo from "../Images/logo.png";
//Used react-icons for clean and customizable icons.
const Navbar = ({ cartCount }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#0F1E13] text-[#F5F5F5] px-4 py-3 shadow-md">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src={Logo} alt="Amalfi" className="h-10" />
          <h1 className="text-2xl font-serif text-[#D4AF37]">Amalfi</h1>
        </div>

        {/* Here i added a hamburger button for mobile menu toggle to make it responsive.
        its only visible to the mobile size */}
        <button
          className="md:hidden text-[#D4AF37] focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Scalable Vector Graphics, Used for the hamburger icon very clean and customizable*/}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Here to display the icons when isOpen is true, no need for pc already displayed*/}
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
        {/* For Desktop  */}
        <div className="hidden md:flex gap-6 text-lg items-center">
          <Link to="/" className="hover:text-[#D4AF37] flex items-center gap-2">
            <FaHome className="text-[#D4AF37]" />
            Home
          </Link>

          <Link
            to="/menu"
            className="hover:text-[#D4AF37] flex items-center gap-2"
          >
            <FaUtensils className="text-[#D4AF37]" />
            Menu
          </Link>

          <Link
            to="/cart"
            className="hover:text-[#D4AF37] flex items-center gap-2"
          >
            <FaShoppingCart className="text-[#D4AF37]" />
            Cart
            <span className="ml-1 bg-[#D4AF37] text-[#0F1E13] px-2 py-0.5 rounded-full text-sm font-semibold">
              {cartCount}
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile Menu When isOpen is true */}
      {isOpen && (
        <div className="flex flex-col items-center gap-4 mt-3 md:hidden text-lg">
          <Link
            to="/"
            className="hover:text-[#D4AF37] flex items-center gap-2"
            onClick={() => setIsOpen(false)}
          >
            <FaHome className="text-[#D4AF37]" />
            Home
          </Link>

          <Link
            to="/menu"
            className="hover:text-[#D4AF37] flex items-center gap-2"
            onClick={() => setIsOpen(false)}
          >
            <FaUtensils className="text-[#D4AF37]" />
            Menu
          </Link>

          <Link
            to="/cart"
            className="hover:text-[#D4AF37] flex items-center gap-2"
            onClick={() => setIsOpen(false)}
          >
            <FaShoppingCart className="text-[#D4AF37]" />
            Cart
            <span className="ml-1 bg-[#D4AF37] text-[#0F1E13] px-2 py-0.5 rounded-full text-sm font-semibold">
              {cartCount}
              {/* Display cart count in mobile menu as well */}
            </span>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
