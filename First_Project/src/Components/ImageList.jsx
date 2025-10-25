import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Tiramisu from "../Images/tiramisu.jpg";
import MargheritaPizza from "../Images/Margherita-pizza.jpg";
import Arancini from "../Images/arancini.webp";
import Lasagna from "../Images/lasagna.jpg";
import Salad from "../Images/salad.jpg";
import Soup from "../Images/soup.jpg";

//I took this ready function from MUI documentation to make responsive images
function srcset(image, width, height, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function CustomImageList() {
  return (
    <div className="flex justify-center items-center w-full mt-8 px-4">
      <div className="w-full max-w-6xl">
        <ImageList
          className="w-full"
          cols={3}
          gap={8}
          sx={{
            transform: "translateZ(0)",
          }}
        >
          {itemData.map((item) => {
            const cols = item.featured ? 2 : 1;
            const rows = item.featured ? 2 : 1;

            return (
              <ImageListItem key={item.img} cols={cols} rows={rows}>
                <img
                  {...srcset(item.img, 250, 200, rows, cols)}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                />
                <ImageListItemBar
                  sx={{
                    background:
                      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                  }}
                  title={item.title}
                  position="top"
                />
              </ImageListItem>
            );
          })}
        </ImageList>
      </div>
    </div>
  );
}

const itemData = [
  {
    img: Tiramisu,
    title: "Dessert",
    featured: true,
  },
  {
    img: MargheritaPizza,
    title: "Pizza",
  },
  {
    img: Arancini,
    title: "Appetizer",
  },
  {
    img: Lasagna,
    title: "Pasta",
  },
  {
    img: Salad,
    title: "Salad",
  },
  {
    img: Soup,
    title: "Soup",
  },
];
