//This is the Home page using italian colors and a welcoming message.
//I used the Link component from react-router-dom to navigate to the Menu page.
//Menu page is not


import { Link } from "react-router-dom";

const Home = () => (
  <div className="text-center py-16 bg-[#1E3B2F] text-[#F5F5F5] rounded-2xl mx-4 mt-6">
    <h1 className="text-4xl font-extrabold text-[#D4AF37] mb-4">
      Welcome to Amalfi
    </h1>
    <p className="text-gray-300 mb-6">
      Authentic Italian Cuisine, crafted with love 🍝
    </p>
    <Link
      to="/menu"
      className="bg-[#D4AF37] text-[#0F1E13] px-6 py-3 rounded-xl text-lg font-semibold hover:bg-yellow-500"
    >
      View Menu
    </Link>
  </div>
);

export default Home;
