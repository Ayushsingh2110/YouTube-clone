import { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Sidebar, VideoCard, Videos } from "../components"; // './' means parent folder
import { fetchFromAPI, fetchFromserver } from "../utils/fetchFromAPI";

const Feed = ({ selectedCategory, type}) => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      type && await fetchFromserver(`video/${type}`).then((data) => setVideos(data));
      
      /*selectedCategory && await fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then((data) =>
            setVideos(data.items)
        );*/
    };
    fetchVideos();
  }, [type, selectedCategory]);

  return (
    {/*<Box py={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
      <Videos videos={videos} />
  </Box>*/},
    <div className="feedContainer">
    {videos.map((video) => (
      <VideoCard key={video._id} video={video}/>
    ))}
  </div> 
  );
};

export default Feed;
