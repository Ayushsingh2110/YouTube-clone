import { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Sidebar, VideoCard, Videos } from "../components"; // './' means parent folder
import { fetchFromserver } from "../utils/fetchFromAPI";

const Feed = ({type}) => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      type && await fetchFromserver(`video/${type}`).then((data) => setVideos(data));
    };
    fetchVideos();
  }, [type]);

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
