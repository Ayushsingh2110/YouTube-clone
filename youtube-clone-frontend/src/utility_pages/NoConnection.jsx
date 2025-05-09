import React from "react";
import NoConnectionImg from "../assets/vectors/no_connection.jpg"
import styled from 'styled-components'
import { Typography } from '@mui/material'

const ImgNoConnection = styled.img`
  width: 30%;
  border-radius: 2rem;
  margin: 3vw 1vw 1vw 1vw;
  @media screen and (orientation: portrait){
    width: 50%
  }
`
const Msg = styled.h1`
  font-size: 2vw;
  color: azure;

  @media screen and (orientation: portrait){
    font-size: 5vw; 
  }
`
const NoConnection = () => {
  return (
    <div style={{width: "100vw", display: "flex", flexDirection: "column", alignItems:"center", justifyContent: "center"}}>
      <ImgNoConnection
        src={NoConnectionImg}
        width="100px"
      ></ImgNoConnection>
      <Msg>
        No Internet Connection
      </Msg>
    </div>
  );
};

export default NoConnection;
