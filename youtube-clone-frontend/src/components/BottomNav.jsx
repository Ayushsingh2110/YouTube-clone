import React from 'react'
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { IconButton } from '@mui/material';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
 display:flex;
 width: 100vw;
 justify-content: space-around;
 position: fixed;
 bottom: 0;
 background: #000;
`
const BottomNav = () => {
  return (
    <Container>
        <Link to="/">
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
            <HomeIcon  />
        </IconButton>
        </Link>
        
        <Link to="/subscriptions">
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
            <SubscriptionsOutlinedIcon />
        </IconButton>
        </Link>
        
        <Link>
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
            <AccountCircleOutlinedIcon />
        </IconButton>
        </Link>
        

    </Container>
  )
}

export default BottomNav