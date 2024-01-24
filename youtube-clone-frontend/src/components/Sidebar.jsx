import React from "react";
import styled from "styled-components";

import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";

import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = styled.div`
  color: azure;
  font-size: 14px;
  position: sticky;
  top: 0;
`;
const Wrapper = styled.div`
  padding: 18px 18px;
  border-bottom: 1px solid grey;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;
`;

const Img = styled.img`
  height: 25px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  color: azure;
  cursor: pointer;
  padding: 7.5px 10px;
  border-radius: 1rem;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.1px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div`
  width: 70%;
  margin: 10px auto;
  text-align: start;
`;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
`;

const Menu = ({ darkMode, setDarkMode }) => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Container>
      <Wrapper>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${isActive ? "link active-menu-link" : "link"}`
          }
        >
          <HomeIcon />
          Home
        </NavLink>

        <NavLink to="/explore" end className={({ isActive }) =>
            `${isActive ? "link active-menu-link" : "link"}`
          }>
            <ExploreOutlinedIcon />
            Explore
        </NavLink>

        {currentUser && (
          <NavLink to="/subscriptions" className={({ isActive }) =>
          `${isActive ? "link active-menu-link" : "link"}`
        }>
              <SubscriptionsOutlinedIcon />
              Subscription
          </NavLink>
        )}
      </Wrapper>

      {currentUser && (
        <Wrapper>
          <NavLink to={currentUser && `/channel/${currentUser._id}`} className={({ isActive }) =>
            `${isActive ? "link active-menu-link" : "link"}`
          }>
              <AccountBoxOutlinedIcon />
              Your channel
          </NavLink>

          <NavLink>
            <VideoLibraryOutlinedIcon />
            Library
          </NavLink>

          <NavLink>
            <HistoryOutlinedIcon />
            History
          </NavLink>
        </Wrapper>
      )}

      {!currentUser && (
        <>
          <Login>
            Sign in to like videos, comment, and subscribe.
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN IN
              </Button>
            </Link>
          </Login>
        </>
      )}
      <Wrapper>
        <NavLink to="/explore/music" className={({ isActive }) =>
            `${isActive ? "link active-menu-link" : "link"}`}>
          <LibraryMusicOutlinedIcon />
          Music
        </NavLink>
        <NavLink to="/explore/sports" className={({ isActive }) =>
            `${isActive ? "link active-menu-link" : "link"}`}>
          <SportsBasketballOutlinedIcon />
          Sports
        </NavLink>
        <NavLink to="/explore/gaming" className={({ isActive }) =>
            `${isActive ? "link active-menu-link" : "link"}`}>
          <SportsEsportsOutlinedIcon />
          Gaming
        </NavLink>
        <NavLink to="/explore/movies" className={({ isActive }) =>
            `${isActive ? "link active-menu-link" : "link"}`}>
          <MovieOutlinedIcon />
          Movies
        </NavLink>
        <NavLink to="/explore/news" className={({ isActive }) =>
            `${isActive ? "link active-menu-link" : "link"}`}>
          <ArticleOutlinedIcon />
          News
        </NavLink>
      </Wrapper>
    </Container>
  );
};

export default Menu;
