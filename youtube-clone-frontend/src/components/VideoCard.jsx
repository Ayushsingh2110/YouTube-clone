import { Link } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Stack,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

import {
  demoThumbnailUrl,
  demoVideoTitle,
  demoVideoUrl,
  demoChannelTitle,
  demoChannelUrl,
} from "../utils/constant";
import { useEffect, useState } from "react";
import { fetchFromserver } from "../utils/fetchFromAPI";

const VideoCard = ({ video }) => {
  /*const channelId = snippet?.channelId;
  const VideoId = id?.videoId;*/

  const [Channel, setChannel] = useState({});
  useEffect(() => {
    const fetchChannel = async() => {
      await fetchFromserver(`/users/find/${video.userId}`).then((data) => setChannel(data))
    }
  })

  return (
    //Whole card body
    <Card 
      sx={{
        width: { xs: "100%", sm: "30vw", md: "25vw" },
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "column",
      }}
    > 
    {/* Video Thumbnail*/}
      <Link to={video._id ? `/video/${video._id}` : demoVideoUrl}> 
        <img src={video.imgUrl}
        alt={video?.title}
        className="videoThumbnail"/>
      </Link>

      {/* Video Details*/}
      <CardContent
        sx={{
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: "row",
          gap: 1,
          padding: "5px 0",
        }}
      >
        <Avatar />
        <Stack direction="column" alignItems="start" spacing={0.5}>
          <Link to={video._id ? `/video/${video._id}` : demoVideoUrl}>
            {/*Video Title*/}
            <Typography variant="subtitle1" fontSize="2vh" color="#FFF">
              {video?.title.slice(0,60) || demoVideoTitle.slice(0, 60)}{(video?.title.length > 60)? "..." : ""}
            </Typography>
          </Link>
           
          <Link to={Channel._id ? `/channel/${Channel._id}` : demoChannelUrl}>
            {/*Channel name*/}
            <Typography variant="subtitle2" color="grey">
              {Channel?.name || demoChannelTitle}
              <CheckCircle sx={{ fontSize: 12, color: "grey", mk: 5 }} />
            </Typography>
          </Link>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
