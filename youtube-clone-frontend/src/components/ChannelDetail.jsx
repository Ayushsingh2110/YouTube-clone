import {
  Box,
  CardContent,
  CardMedia,
  Stack,
  StyledEngineProvider,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Videos, ChannelCard, VideoCard } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { demoProfilePicture } from "../utils/constant";

const ChannelDetail = () => {
  const { id } = useParams();
  const [channelDetails, setchannelDetails] = useState(null);
  const [videos, setVideos] = useState([]);

  const getChannelfromAPI = async () => {
    const GetChannel = await fetchFromAPI(
      `channels?part=snippet,statistics&id=${id}`
    );
    const Channel = GetChannel?.items[0];
    if (Channel) {
      setchannelDetails(Channel);
      console.log(Channel);
    }

    const GetChannelVideos = await fetchFromAPI(
      `search?channelId=${id}&part=snippet,id&order=date`
    );
    const channelVideos = GetChannelVideos?.items;
    if (channelVideos) {
      setVideos(channelVideos);
    }
  };

  useEffect(() => {
    getChannelfromAPI();
  }, [id]);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <StyledEngineProvider injectFirst>
      <Box minHeight="95vh">
      <Box
        sx={{ alignItems: "center", display: "flex", flexDirection: "column" }}
      >
        <div className="channelProfileTemplate">
          <img
            src={channelDetails?.brandingSettings?.image?.bannerExternalUrl}
            alt=""
            className="ChannelBanner"
          />
        </div>
        <div className="channelProfileCard">
          <img
            src={
              channelDetails?.snippet?.thumbnails?.high?.url ||
              demoProfilePicture
            }
            alt={channelDetails?.snippet?.title}
          />
          <Stack>
            <Typography variant="h6" color={"azure"}>
              {channelDetails?.snippet?.title}{" "}
              <CheckCircleIcon
                sx={{ fontSize: "14px", color: "gray", ml: "5px" }}
              />
            </Typography>

            <Stack direction="row" alignItems="flex-start" gap={1}>
              <p className="CardDetail">{channelDetails?.snippet?.customUrl}</p>
              <p className="CardDetail">
                {channelDetails?.statistics?.subscriberCount} subscribers
              </p>
              <p className="CardDetail">
                {channelDetails?.statistics?.videoCount} videos
              </p>
            </Stack>

            <p className="CardDetail">
              {channelDetails?.snippet?.description.slice(0, 70)}...
            </p>
          </Stack>
        </div>
      </Box>
      <Box
          sx={{ Width: "150px", bgcolor: "#0f0f0f", borderBottom:"1px solid grey"}}
        >
          <Tabs
            className="TabsInProfile"
            value={value}
            onChange={handleChange}
            textColor="inherit"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            TabIndicatorProps={{
              style: {
                backgroundColor: "azure",
              }
            }}
          >
            <Tab label="Videos" sx={{color:"azure"}}/>
            <Tab label="Playlist" sx={{color:"azure"}}/>
            <Tab label="About" sx={{color:"azure"}}/>
          </Tabs>
        </Box>
      <Box display="flex" p="2">
        <Box>
          <Videos videos={videos} />
        </Box>
      </Box>
    </Box>
    </StyledEngineProvider>
    
  );
};

export default ChannelDetail;

/*<Card
  sx={{
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
    color: "#fff",
  }}
>
  <CardMedia
    image={channelDetails?.snippet?.thumbnails?.high?.url || demoProfilePicture}
    alt={channelDetails?.snippet?.title}
    sx={{
      borderRadius: "50%",
      height: "180px",
      width: "180px",
      mb: 2,
      border: "1px solid #e3e3e3",
    }}
  />
  <CardContent>
    <Typography variant="h6">
      {channelDetails?.snippet?.title}{" "}
      <CheckCircleIcon sx={{ fontSize: "14px", color: "gray", ml: "5px" }} />
    </Typography>
    <Typography variant="subtitle1">
      {channelDetails?.snippet?.customUrl}
    </Typography>

    {channelDetails?.statistics?.subscriberCount && (
      <Typography sx={{ fontSize: "15px", fontWeight: 500, color: "gray" }}>
        {parseInt(channelDetails?.statistics?.subscriberCount).toLocaleString(
          "en-US"
        )}{" "}
        Subscribers
      </Typography>
    )}
  </CardContent>
</Card>;*/
