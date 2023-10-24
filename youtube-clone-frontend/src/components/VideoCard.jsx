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

const VideoCard = ({ video: { id, snippet } }) => {
  const channelId = snippet?.channelId;
  const VideoId = id?.videoId;

  let mdWidth;
  let smWidth;
  let xsWidth;

  return (
    //Whole card body
    <Card
      sx={{
        width: { xs: "100%", sm: "30vw", md: "25vw" },
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "column",
      }}
    > {/* Video Thumbnail*/}
      <Link to={VideoId ? `/video/${VideoId}` : demoVideoUrl}>
        <CardMedia
          component="img"
          image={snippet?.thumbnails?.high?.url}
          alt={snippet?.title}
          sx={{
            width: { xs: "100%", sm: "30vw", md: "25vw" },
            objectFit: "cover"
          }}
        />
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
          <Link to={VideoId ? `/video/${VideoId}` : demoVideoUrl}>
            {/*Video Title*/}
            <Typography variant="subtitle1" fontSize="2vh" color="#FFF">
              {snippet?.title.slice(0,60) || demoVideoTitle.slice(0, 60)}...
            </Typography>
          </Link>
           
          <Link to={channelId ? `/channel/${channelId}` : demoChannelUrl}>
            {/*Channel name*/}
            <Typography variant="subtitle2" color="grey">
              {snippet?.channelTitle || demoChannelTitle}
              <CheckCircle sx={{ fontSize: 12, color: "grey", mk: 5 }} />
            </Typography>
          </Link>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
