const MenuItemCard = ({ item, onAddToCart }) => (
  <div className="bg-[#1A2B21] rounded-2xl shadow-lg overflow-hidden text-[#F5F5F5] hover:scale-105 transition">
    <img
      src={item.image}
      alt={item.name}
      className="w-full h-40 object-cover"
    />
    <div className="p-4">
      <h3 className="font-bold text-lg text-[#D4AF37]">{item.name}</h3>
      <p className="text-sm text-[#CFCFCF]">{item.description}</p>
      <p className="font-semibold mt-1">${item.price}</p>
      <button
        onClick={() => onAddToCart(item)}
        className="mt-3 w-full bg-[#D4AF37] text-[#0F1E13] py-2 rounded-xl font-semibold hover:bg-yellow-500"
      >
        Add to Cart
      </button>
    </div>
  </div>
);

export default MenuItemCard;
