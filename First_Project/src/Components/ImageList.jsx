import Tiramisu from "../Images/tiramisu.jpg";
import MargheritaPizza from "../Images/Margherita-pizza.jpg";
import Arancini from "../Images/Arancini.webp";
import Lasagna from "../Images/Lasagna.jpg";
import Salad from "../Images/Salad.jpg";
import Soup from "../Images/Soup.jpg";

export default function CustomImageList() {
  return (
    <div className="flex justify-center items-center w-full py-12 px-6 bg-[#1E3B2F]">
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {itemData.map((item, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl shadow-lg group transition-all duration-300 hover:shadow-[0_8px_30px_#D4AF37]/40"
            >
              <img
                src={item.img}
                alt={item.title}
                loading="lazy"//we used lazy loading for better performance so images load only when they are in viewport
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-[#F5F5F5]">
                <h3 className="text-xl font-semibold tracking-wide">{item.title}</h3>
                <p className="text-sm text-gray-300">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const itemData = [
  {
    img: Tiramisu,
    title: "Dolci Selection",
    subtitle: "Indulge in our sweet creations",
  },
  {
    img: MargheritaPizza,
    title: "Artisan Pizzas",
    subtitle: "Classic Italian flavors crafted to perfection",
  },
  {
    img: Arancini,
    title: "Antipasti",
    subtitle: "A variety of starters to awaken your appetite",
  },
  {
    img: Lasagna,
    title: "Handmade Pasta",
    subtitle: "Traditional recipes with a modern twist",
  },
  {
    img: Salad,
    title: "Fresh Salads",
    subtitle: "Crisp, seasonal ingredients for a light bite",
  },
  {
    img: Soup,
    title: "Chef's Soups",
    subtitle: "Warm and comforting, crafted daily",
  },
];
