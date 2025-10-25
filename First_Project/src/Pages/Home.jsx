//This is the Home page using italian colors and a welcoming message.
//I used the Link component from react-router-dom to navigate to the Menu page.

import ImageList from "../Components/ImageList";
import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";



const Home = () => {
  const isSmall = useMediaQuery("(max-width:600px)");
  const isMedium = useMediaQuery("(max-width:900px)");
return (
  <>
    <div className="bg-[url('./Images/Amalfi-coast.jpg')] bg-cover bg-center relative rounded-2xl mx-4 mt-6">
      <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>
      <div className="relative z-10 text-center py-16 text-[#F5F5F5]">
        <h1 className="text-4xl font-extrabold text-[#D4AF37] mb-4">
          Welcome to Amalfi
        </h1>
        <p className="italic text-lg text-gray-300 mb-6">
          Where every bite tastes like Italy 🇮🇹
        </p>
      <Link
        to="/menu"
        className="bg-[#D4AF37] text-[#0F1E13] px-6 py-3 rounded-xl text-lg font-semibold hover:bg-yellow-500"
      >
        View Menu →
      </Link>
      </div>
    </div>
    {/*Featured Dishes*/}
    <div className="text-center py-16 bg-[#1E3B2F] text-[#F5F5F5] rounded-2xl mx-4 mt-6">
      <h1 className="text-4xl font-extrabold text-[#D4AF37] mb-4">
        Featured Dishes
      </h1>
      <ImageList
        sx={{
          width: "100%",
          maxWidth: 1000,
          transform: "translateZ(0)",
        }}
        cols={isSmall ? 1 : isMedium ? 2 : 3}
        gap={8}
      ></ImageList>{" "}
      <p className="text-gray-300 mb-6 py-4">
        Explore our chef's special selections, showcasing the finest flavors of
        Italy.
      </p>
      <Link
        to="/menu"
        className="bg-[#D4AF37] text-[#0F1E13] px-6 py-3 rounded-xl text-lg font-semibold hover:bg-yellow-500"
      >
        View Menu →
      </Link>
    </div>
  </>
);};

export default Home;
