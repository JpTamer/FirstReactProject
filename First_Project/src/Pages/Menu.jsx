import { useState, useEffect } from 'react';
import axios from 'axios';
import MenuItemCard from "../Components/MenuItemCard";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

import MargheritaPizza from "../Images/Margherita-pizza.jpg";
import Alfredo from "../Images/fettuccine-alfredo.jpg";
import Tiramisu from "../Images/tiramisu.jpg";
import Soup from "../Images/Soup.jpg";
import Salad from "../Images/Salad.jpg";
import Arancini from "../Images/Arancini.webp";
import BresaolaPizza from "../Images/BresaolaPizza.webp";
import Lasagna from "../Images/Lasagna.jpg";
import PainPerdue from "../Images/PainPerdue-1.jpg";
import Truffle from "../Images/Truffle.jpg";
import Pesto from "../Images/Pesto.jpg";
import Quatro from "../Images/Quatro.webp";
import Bruschetta from "../Images/Bruschetta.webp";

// Image mapping for local images
const IMAGE_MAP = {
  '/images/Soup.jpg': Soup,
  '/images/Salad.jpg': Salad,
  '/images/Arancini.webp': Arancini,
  '/images/Bruschetta.webp': Bruschetta,
  '/images/Margherita-pizza.jpg': MargheritaPizza,
  '/images/BresaolaPizza.webp': BresaolaPizza,
  '/images/Quatro.webp': Quatro,
  '/images/Lasagna.jpg': Lasagna,
  '/images/fettuccine-alfredo.jpg': Alfredo,
  '/images/Truffle.jpg': Truffle,
  '/images/Pesto.jpg': Pesto,
  '/images/tiramisu.jpg': Tiramisu,
  '/images/PainPerdue-1.jpg': PainPerdue,
};

const Menu = ({ addToCart }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get(`${API_URL}/menu`);
      // Group items by category
      const grouped = response.data.reduce((acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = [];
        }
        // Map image URLs to local imports
        const itemWithImage = {
          ...item,
          image: IMAGE_MAP[item.image_url] || item.image_url
        };
        acc[item.category].push(itemWithImage);
        return acc;
      }, {});
      setMenuItems(grouped);
      setLoading(false);
    } catch (err) {
      setError('Failed to load menu items');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="px-6 py-8 bg-[#0F1E13] min-h-screen flex items-center justify-center">
        <div className="text-[#D4AF37] text-xl">Loading menu...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-6 py-8 bg-[#0F1E13] min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </section>
    );
  }

  return (
    <section className="px-6 py-8 bg-[#0F1E13] min-h-screen">
      <h2 className="text-3xl font-bold text-center text-[#D4AF37] mb-8">
        Our Menu
      </h2>

      {/* Display categories from backend in proper order */}
      {['Starters', 'Pizzas', 'Pastas', 'Desserts'].map((category) => (
        menuItems[category] && (
          <div key={category} className="mb-12">
            <h3 className="text-2xl font-semibold text-[#D4AF37] underline mb-2 py-5">
              {category}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems[category].map((item) => (
                <MenuItemCard key={item.id} item={item} onAddToCart={addToCart} />
              ))}
            </div>
          </div>
        )
      ))}
    </section>
  );
};

export default Menu;
