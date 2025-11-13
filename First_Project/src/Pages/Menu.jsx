import MenuItemCard from "../Components/MenuItemCard";
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
const DUMMY_MENU = {
  Starters: [
    {
      id: 1,
      name: "Soup",
      description: "Italian vegetable soup",
      price: 3.49,
      image: Soup,
    },
    {
      id: 2,
      name: "Salad",
      description: "Fresh garden salad mixed with goat cheese",
      price: 5.49,
      image: Salad,
    },
    {
      id: 3,
      name: "Arancini",
      description: "Risotto balls filled with cheese",
      price: 4.99,
      image: Arancini,
    },
    {
      id : 4,
      name: "Bruschetta",
      description: "Grilled bread with tomato & basil",
      price: 2.49,
      image: Bruschetta,
    },
  ],
  Pizzas: [
    {
      id: 5,
      name: "Margherita Pizza",
      description: "Classic with mozzarella & basil",
      price: 8.99,
      image: MargheritaPizza,
    },
    {
      id: 6,
      name: "Bresaola Pizza",
      description: "Air-dried, salted beef with arugula",
      price: 7.99,
      image: BresaolaPizza,
    },
    {id: 7,
      name: "Quatro Formaggi Pizza",
      description: "Mozzarella, gorgonzola, parmesan, ricotta",
      price: 9.49,
      image: Quatro,
    }
  ],
  Pastas: [
    {
      id: 8,
      name: "Lasagna",
      description: "Layers of pasta with meat sauce & béchamel",
      price: 6.49,
      image: Lasagna,
    },
    {
      id: 9,
      name: "Pasta Alfredo",
      description: "Creamy sauce & parmesan",
      price: 10.99,
      image: Alfredo,
    },
    {id: 10,
      name: "Truffle Pasta",
      description: "Black truffle with creamy sauce",
      price: 12.49,
      image: Truffle,
    },
    {
      id: 11,
      name: "Pesto Pasta",
      description: "Basil pesto with pine nuts",
      price: 9.49,
      image: Pesto,
    },
  ],
  Desserts: [
    {
      id: 12,
      name: "Tiramisu",
      description: "Italian coffee dessert",
      price: 6.49,
      image: Tiramisu,
    },
    {
      id: 13,
      name: "Pain Perdue",
      description: "French toast with caramelized sugar",
      price: 7.49,
      image: PainPerdue,
    },
  ],
};

const Menu = ({ addToCart }) => (
  <section className="px-6 py-8 bg-[#0F1E13] min-h-screen">
    <h2 className="text-3xl font-bold text-center text-[#D4AF37] mb-8">
      Our Menu
    </h2>

    {/* Object.keys(DUMMY_MENU) returns an array of the menu categories */}
    {Object.keys(DUMMY_MENU).map((category) => (
      <div key={category} className="mb-12">
        <h3 className="text-2xl font-semibold text-[#D4AF37] underline mb-2 py-5">
          {category}
        </h3>

        {/* Display all items inside this category using .map for looping and key for sorting by key value*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DUMMY_MENU[category].map((item) => (
            <MenuItemCard key={item.id} item={item} onAddToCart={addToCart} />
          ))}
        </div>
      </div>
    ))}
  </section>
);

export default Menu;
