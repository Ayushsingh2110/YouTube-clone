import { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { NoSearchResult, Sidebar, VideoCard, Videos } from "../components"; // './' means parent folder
import { fetchFromAPI, fetchFromserver } from "../utils/fetchFromAPI";
import { useParams } from "react-router-dom";

const SearchFeed = () => {
  
  const { searchTerm } = useParams();
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    
    const getSearch = async() => (
      await fetchFromserver(`video/search?q=${searchTerm}`).then((data) =>
      setVideos(data)
      ));
    getSearch();
  }, [searchTerm]);

  if(videos.length === 0){
    return <NoSearchResult />
  }

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        {
          videos.map((video) => <VideoCard videos={video} />)
        }
        
      </Box>
    </Stack>
  );
};

export default SearchFeed;
