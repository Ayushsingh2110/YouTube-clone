import { CheckCircle } from "@mui/icons-material";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React from "react";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { Link, useParams } from "react-router-dom";

import { Videos } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { demoProfilePicture } from "../utils/constant";

const VideoDetail = ({ setShowSidebar}) => {

  let recomm_video_flexDirection = "column"
  if(window.innerWidth < 900){
    recomm_video_flexDirection = "row"
  }

  const { id } = useParams();

  
  const [videoDetail, setVideoDetail] = useState([]);
  const [channelDetails, setChannelDetails] = useState(null);
  const [RelatedVideos, setRelatedVideo] = useState(null);

  const GetDataFromAPI = async () => {
   
    try {
      const videoResponse = await fetchFromAPI(
        `videos?part=snippet,statistics&id=${id}`
      );
      const firstItem = videoResponse?.items[0];
      if (firstItem) {
        setVideoDetail(firstItem);
        const channelId = firstItem?.snippet?.channelId;

        const channelResponse = await fetchFromAPI(
          `channels?part=snippet&id=${channelId}`
        );
        const firstChannel = channelResponse?.items[0];
        if (firstChannel) {
          setChannelDetails(firstChannel);
        }

        const relatedResponse = await fetchFromAPI(
          `search?part=id,snippet&type=video&relatedToVideoId=${id}&maxResults=20`
        );
        const relatedVideos = relatedResponse.items;
        if (relatedVideos) {
          setRelatedVideo(relatedVideos);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    GetDataFromAPI();
  }, [id, videoDetail?.snippet?.channelId]);

  if (!videoDetail) {
    return <div>Loading...</div>; // Or another loading indicator
  }

  return (
    <Box minHeight="95vh" sx={{overflowY:"auto"}}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="center"
        mt={5}
      >
        {/*Video Player*/}
        <Box
          mx={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "top",
            flex: 0.7,
            height: '95vh'
          }}
        >
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${id}`}
            className="react-player"
            controls
          />

          {/* Video Title */}
          <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
            {videoDetail?.snippet?.title}
          </Typography>

          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ color: "#fff" }}
            py={1}
            px={2}
          >
            <Box sx={{ display: "flex", gap: "10px" }}>
              <Link to={`/channel/${videoDetail?.snippet?.channelId}`}>
                {/* Channel Avatar */}
                <Avatar
                  src={
                    channelDetails?.snippet?.thumbnails?.high?.url ||
                    demoProfilePicture
                  }
                  alt={channelDetails?.snippet?.title}
                  className="miniProfileImg"
                />
              </Link>
              <Link
                to={`/channel/${videoDetail?.snippet?.channelId}`}
                style={{ display: "Flex", alignItems: "center" }}
              >
                {/* Channel name */}
                <Typography
                  variant={{ sm: "subtitle1", md: "h6" }}
                  color="#fff"
                >
                  {videoDetail?.snippet?.channelTitle}
                  <CheckCircleIcon
                    sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                  />
                </Typography>
              </Link>
            </Box>

            <Stack direction="row" gap="20px" alignItems="center">
              <Typography variant="body1" sx={{ opacity: 0.7 }}>
                {parseInt(videoDetail?.statistics?.viewCount).toLocaleString()}
                views
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.7 }}>
                {parseInt(videoDetail?.statistics?.likeCount).toLocaleString()}
                likes
              </Typography>
            </Stack>
          </Stack>
        </Box>

        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
          flex={0.3}
        >
          <Videos videos={RelatedVideos} direction={recomm_video_flexDirection} />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
