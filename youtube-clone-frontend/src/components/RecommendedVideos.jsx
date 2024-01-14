import React, { useEffect, useState } from 'react';
import { fetchFromserver } from '../utils/fetchFromAPI';
import VideoCard from './VideoCard';
import styled from "styled-components";

const Header = styled.h1`
    font-weight: bold;
    color: azure;
`
const Message = styled.p`
    color: lightgrey;
`

const RecommendedVideos = ({tags}) => {

    const [RecommVideos, setRecommVideos] = useState([]);
    const fetchRecommended = async() => {
        const videoList = await fetchFromserver('video/tags', tags)
        setRecommVideos(videoList);
    }

    useEffect(() => {
        fetchRecommended();
    }, [tags]);

    if(RecommVideos.length === 0){
        return <Message>No similar videos found for this search</Message>
    }

  return (
    <>
    <Header>Similar Videos</Header>
    {
        RecommVideos.map((video) => {return <VideoCard video={video}/>} )
    }
    </>
    
  )
}

export default RecommendedVideos