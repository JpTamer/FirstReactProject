const CartItem = ({ item, onAdd, onDecrement, onRemove }) => {
  const { id, name, price, image, quantity } = item;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-[#1E3B2F] text-[#F5F5F5] p-4 rounded-lg shadow-md mb-3 gap-3 sm:gap-0">
      <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 min-w-16 min-h-16 object-cover rounded-md border border-[#D4AF37] shrink-0"
          style={{maxWidth:'64px',maxHeight:'64px'}}
        />
        <div className="flex-1">
          <h3 className="text-base sm:text-lg font-semibold break-all">{name}</h3>
          <p className="text-xs sm:text-sm text-gray-300">${(price * quantity).toFixed(2)}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-start sm:justify-end gap-2 sm:gap-3 w-full sm:w-auto pt-2 sm:pt-0">
        <div className="flex flex-row items-center gap-2 sm:gap-3">
          <button
            onClick={() => onDecrement(id)}
            className="px-3 py-1 min-w-9 bg-[#D4AF37] text-[#0F1E13] rounded-md font-bold hover:opacity-90 transition"
          >
            -
          </button>
          <span className="text-base sm:text-lg font-medium w-8 text-center select-none">{quantity}</span>
          <button
            onClick={() => onAdd(id)}
            className="px-3 py-1 min-w-9 bg-[#D4AF37] text-[#0F1E13] rounded-md font-bold hover:opacity-90 transition"
          >
            +
          </button>
        </div>
        <button
          onClick={() => onRemove(id)}
          className="w-full sm:w-auto mt-2 sm:mt-0 px-3 py-1  bg-red-600 text-white rounded-md font-bold hover:opacity-90 transition"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;