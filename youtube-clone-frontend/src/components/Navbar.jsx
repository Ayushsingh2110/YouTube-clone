import { Stack, Box, IconButton, useMediaQuery } from "@mui/material";
import { Search } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../utils/constant";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";

const Navbar = ({ ShowSidebar, setShowSidebar }) => {
  const clickEvent = () => {
    setShowSidebar(!ShowSidebar);
  };
  const isTablet = useMediaQuery("(max-width: 769px)");
  const isMobile = useMediaQuery("(max-width: 480px)"); //to check if screen width is less than 425px so that .searchIcon can be added to DOM
  const searchBtn = document.querySelector(".searchBtn");
  const searchForm = document.querySelector(".mobile_searchBar");
  const removeSearch = document.querySelector(".backArrow");

  useEffect(() => {
    if (searchBtn && searchForm) {
      searchBtn.addEventListener("click", function () {
        searchForm.classList.add("active");
        console.log("searchbtn clicked");
      });

      removeSearch.addEventListener("click", function () {
        searchForm.classList.remove("active");
      });

      document.body.addEventListener("click", function (e) {
        if (
          !e.target.classList.contains("searchBtn") &&
          e.target.id !== "searchBar"
        ) {
          searchForm.classList.remove("active");
        }
      });
    }
  }, []);

  const navigate = useNavigate();

  const [searchTerm, setSearchterm] = useState();

  const submitSearch = (e) => {
    e.preventDefault();
    searchForm.classList.remove("active");
    if (searchTerm) {
      navigate(`/search/${searchTerm}`);

      setSearchterm("");
    }
  };

  return (
    <div className="Navbar">
      <Stack direction="row" alignItems="start">
        {!isTablet && <IconButton
          aria-label="open drawer"
          edge="start"
          sx={{ mx: 1, color: "whitesmoke" }}
          onClick={clickEvent}
        >
          <MenuIcon />
        </IconButton>}

        <Link to="/" style={{ display: "Flex", alignItems: "center", mx: 1 }}>
          <img src={logo} alt="logo" height={45} />
        </Link>
      </Stack>
      {!isMobile && <SearchBar searchTerm={searchTerm} setSearchterm={setSearchterm} />}

      <form className="mobile_searchBar" onSubmit={submitSearch}>
        <IconButton className="backArrow">
          <ArrowBackIcon style={{ color: "whitesmoke" }} />
        </IconButton>
        <input
          type="text"
          id="searchBar"
          placeholder="Search YouTube clone"
          onChange={(e) => {
            setSearchterm(e.target.value);
          }}
          value={searchTerm}
        />
      </form>

      <Box>
        {isMobile && (
          <IconButton
            className="searchIcon"
            edge="start"
            sx={{ mx: 1, color: "whitesmoke" }}
          >
            <SearchIcon className="searchBtn" />
          </IconButton>
        )}

        <IconButton edge="start" sx={{ mx: 1, color: "whitesmoke" }}>
          <NotificationsNoneIcon />
        </IconButton>

        {!isMobile && (
          <Link to="/signin">
            <button className="signInBtn">
              Sign In
              <IconButton
                edge="start"
                sx={{
                  mx: 1,
                  color: "whitesmoke",
                  border: "1px soild whitesmoke",
                  margin: "0px",
                  paddingRight: "0px",
                }}
              >
                <AccountCircleOutlinedIcon alt="SignIn" />
              </IconButton>
            </button>
          </Link>
        )}
      </Box>
    </div>
  );
};

export default Navbar;
