import React from "react";
import styled from "styled-components";
import exploreList from "../assets/data/exploreList";
import { Link } from "react-router-dom";

const Title = styled.h1`
  color: azure;
  font-size: 16px;
`;
const Img = styled.img`
  height: 100px;
  width: 100px;
  object-fit: cover;
  border-radius: 50%;
  background-color: gray;
`;
const Card = styled.div`
  flex: 1;
  height: max-content;
  width: max-content;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;
const ExplorePage = () => {
  return (
    <>
      <CardContainer>
        {exploreList.map((item, index) => (
          <Link to={item.path}>
            <Card key={index}>
              <Img src={item.icon} alt="" />
              <Title>{item.name}</Title>
            </Card>
          </Link>
        ))}
      </CardContainer>
    </>
  );
};

export default ExplorePage;
