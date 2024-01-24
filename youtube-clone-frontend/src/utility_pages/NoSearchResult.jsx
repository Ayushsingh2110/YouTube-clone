import React from 'react'
import styled from 'styled-components'
import NoResultImage from '../assets/vectors/NoResult_Yotube.png'

const NoResult = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const Text = styled.h1`
    color: grey;
    @media (max-width: 900px){
        font-size: 18px;
    }
`
const Img = styled.img`
    width: 200px;
`
const NoSearchResult = () => {

  return (
    <NoResult>
        <Img src={NoResultImage} alt="" />
        <Text>We Regret, no match found for this search !</Text>
    </NoResult>
  )
}

export default NoSearchResult