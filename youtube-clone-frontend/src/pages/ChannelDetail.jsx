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
import { Videos, ChannelCard, VideoCard } from "../components";
import { fetchFromAPI, fetchFromserver } from "../utils/fetchFromAPI";
import { demoProfilePicture } from "../utils/constant";

const ChannelDetail = () => {
  const { id } = useParams();
  const [channelDetails, setchannelDetails] = useState(null);
  const [videos, setVideos] = useState([]);
  const [value, setValue] = useState(0);

  /* Function to get Channel's data 
  and data of all of its videos
  */
  const getChannelfromAPI = async () => {
    const GetChannel = await fetchFromserver(`/user/find/${id}`);
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
    try {
      getChannelfromAPI();
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <StyledEngineProvider injectFirst>
      <Box minHeight="95vh">
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* --------------- channel template -----------------*/}
          <div className="channelProfileTemplate">
            <img
              src={channelDetails?.templateImg}
              alt={channelDetails?.title}
              className="ChannelBanner"
            />
          </div>

          <div className="channelProfileCard">
            {/* ------------- User profile image -------------------*/}
            <img
              src={
                channelDetails?.profileImg ||
                demoProfilePicture
              }
              alt={channelDetails?.title}
            />

            <Stack>
              {/* ------------- Channel Title -----------------*/}
              <Typography variant="h6" color={"azure"}>
                {channelDetails?.title}{" "}
                <CheckCircleIcon
                  sx={{ fontSize: "14px", color: "gray", ml: "5px" }}
                />
              </Typography>

              {/* ------------- Channel Details -----------------*/}
              <Stack direction="row" alignItems="flex-start" gap={1}>
                <p className="CardDetail">
                  {channelDetails?.subscribers} subscribers{" "}
                  {/* Subscriber count */}
                </p>
                <p className="CardDetail">
                  {videos?.length} videos {/* total video count */}
                </p>
              </Stack>

              {/* ------------- Channel Description -----------------*/}
              <p className="CardDetail">
                {channelDetails?.description.slice(0, 70)}
                {channelDetails?.description.length > 70 ? "..." : ""}
              </p>
            </Stack>
          </div>
        </Box>
        <Box
          sx={{
            Width: "150px",
            bgcolor: "#0f0f0f",
            borderBottom: "1px solid grey",
          }}
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
              },
            }}
          >
            <Tab label="Videos" sx={{ color: "azure" }} />
            <Tab label="Playlist" sx={{ color: "azure" }} />
            <Tab label="About" sx={{ color: "azure" }} />
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
