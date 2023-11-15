import { useMediaQuery } from "@mui/material";
import { menu, explore } from "../utils/constant.js";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ selectedCategory, setSelectedCategory }) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 480px)');
  return (
    <div className="Sidebar_main">
      {!isMobile && menu.map((listItem) => (
        <button
          className="category-btn"
          onClick={() => {
            switch (listItem.name) {
              case "Subscription":
                navigate("/subscriptions");
                break;
              default:
                navigate("/");
            }
          }}
          style={{
            background: listItem.name === selectedCategory && "#FC1503",
            color: "white",
          }}
          key={listItem.name}
        >
          <span
            style={{
              color: listItem.name === selectedCategory ? "white" : "red",
              marginRight: "10px",
            }}
          >
            {listItem.icon}
          </span>
          <span
            style={{
              opacity: listItem.name === selectedCategory ? "1" : "0.8",
            }}
          >
            {listItem.name}
          </span>
        </button>
      ))
      
      }

      {!isMobile && <hr style={{ width: "80%" }} />}

      {explore.map((category) => (
        <button
          className="category-btn"
          onClick={() => {
            setSelectedCategory(category.name);
            navigate("/");
          }}
          style={{
            background: category.name === selectedCategory && "#FC1503",
            color: "white",
          }}
          key={category.name}
        >
          <span
            style={{
              color: category.name === selectedCategory ? "white" : "red",
              marginRight: "10px",
            }}
          >
            {category.icon}
          </span>
          <span
            style={{
              opacity: category.name === selectedCategory ? "1" : "0.8",
            }}
          >
            {category.name}
          </span>
        </button>
      ))}
    </div>
  );
};
export default Sidebar;
