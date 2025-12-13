import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaUtensils, FaShoppingCart, FaUser, FaSignOutAlt, FaClipboardList } from "react-icons/fa";
import Logo from "../Images/Logo.png";
import { useAuth } from "../context/AuthContext";
//Used react-icons for clean and customizable icons.
const Navbar = ({ cartCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav className="bg-[#0F1E13] text-[#F5F5F5] px-6 py-4 shadow-lg border-b-2 border-[#D4AF37]">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <img src={Logo} alt="Amalfi" className="h-12 w-12 object-contain" />
          <h1 className="text-3xl font-serif text-[#D4AF37] tracking-wide">Amalfi</h1>
        </Link>

        {/* Mobile view - Show login/user and hamburger */}
        <div className="md:hidden flex items-center gap-4">
          {user ? (
            <span className="text-[#D4AF37] flex items-center gap-2 text-sm font-medium">
              <FaUser className="text-[#D4AF37]" />
              <span className="hidden sm:inline">{user.name}</span>
            </span>
          ) : (
            <Link
              to="/login"
              className="bg-[#D4AF37] text-[#0F1E13] px-4 py-2 rounded-lg font-semibold hover:bg-[#C5A028] transition flex items-center gap-2 text-sm"
            >
              <FaUser />
              Login
            </Link>
          )}
          
          <button
            className="text-[#D4AF37] focus:outline-none hover:text-[#C5A028] transition"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
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
        </div>
        
        {/* For Desktop  */}
        <div className="hidden md:flex gap-8 text-base items-center">
          <Link to="/" className="text-[#F5F5F5] hover:text-[#D4AF37] flex items-center gap-2 transition font-medium">
            <FaHome className="text-[#D4AF37]" />
            Home
          </Link>

          <Link
            to="/menu"
            className="text-[#F5F5F5] hover:text-[#D4AF37] flex items-center gap-2 transition font-medium"
          >
            <FaUtensils className="text-[#D4AF37]" />
            Menu
          </Link>

          <Link
            to="/cart"
            className="text-[#F5F5F5] hover:text-[#D4AF37] flex items-center gap-2 transition font-medium relative"
          >
            <FaShoppingCart className="text-[#D4AF37]" />
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-6 bg-[#D4AF37] text-[#0F1E13] px-2 py-0.5 rounded-full text-xs font-bold min-w-[20px] text-center">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <>
              <Link
                to="/my-orders"
                className="text-[#F5F5F5] hover:text-[#D4AF37] flex items-center gap-2 transition font-medium"
              >
                <FaClipboardList className="text-[#D4AF37]" />
                My Orders
              </Link>
              <div className="h-6 w-px bg-[#D4AF37]"></div>
              <span className="text-[#D4AF37] flex items-center gap-2 font-medium">
                <FaUser className="text-[#D4AF37]" />
                {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="bg-[#D4AF37] text-[#0F1E13] px-4 py-2 rounded-lg font-semibold hover:bg-[#C5A028] transition flex items-center gap-2"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-[#D4AF37] text-[#0F1E13] px-5 py-2 rounded-lg font-semibold hover:bg-[#C5A028] transition flex items-center gap-2"
            >
              <FaUser />
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu When isOpen is true */}
      {isOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-[#D4AF37]/30">
          <div className="flex flex-col items-start gap-4 text-base">
            <Link
              to="/"
              className="w-full text-[#F5F5F5] hover:text-[#D4AF37] hover:bg-[#1E3B2F] px-4 py-3 rounded-lg flex items-center gap-3 transition font-medium"
              onClick={() => setIsOpen(false)}
            >
              <FaHome className="text-[#D4AF37]" />
              Home
            </Link>

            <Link
              to="/menu"
              className="w-full text-[#F5F5F5] hover:text-[#D4AF37] hover:bg-[#1E3B2F] px-4 py-3 rounded-lg flex items-center gap-3 transition font-medium"
              onClick={() => setIsOpen(false)}
            >
              <FaUtensils className="text-[#D4AF37]" />
              Menu
            </Link>

            <Link
              to="/cart"
              className="w-full text-[#F5F5F5] hover:text-[#D4AF37] hover:bg-[#1E3B2F] px-4 py-3 rounded-lg flex items-center gap-3 transition font-medium"
              onClick={() => setIsOpen(false)}
            >
              <FaShoppingCart className="text-[#D4AF37]" />
              Cart
              {cartCount > 0 && (
                <span className="ml-auto bg-[#D4AF37] text-[#0F1E13] px-2 py-1 rounded-full text-xs font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {user && (
              <>
                <Link
                  to="/my-orders"
                  className="w-full text-[#F5F5F5] hover:text-[#D4AF37] hover:bg-[#1E3B2F] px-4 py-3 rounded-lg flex items-center gap-3 transition font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  <FaClipboardList className="text-[#D4AF37]" />
                  My Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full bg-[#D4AF37] text-[#0F1E13] px-4 py-3 rounded-lg font-semibold hover:bg-[#C5A028] transition flex items-center gap-3 mt-2"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
