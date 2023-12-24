import { Link } from "react-router-dom";
import {
  Typography,
  Stack
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
import {format} from "timeago.js";

const VideoCard = ({ video }) => {
  /*const channelId = snippet?.channelId;
  const VideoId = id?.videoId;*/

  const [Channel, setChannel] = useState({});
  useEffect(() => {
    const fetchChannel = async () => {
      await fetchFromserver(`user/find/${video.userId}`).then((data) =>
        setChannel(data)
      );
    };
    fetchChannel();
  });

  return (
    //Whole card body
      <div
        className="videoCard"
      >
        {/* Video Thumbnail*/}
        <Link to={video._id ? `/video/${video._id}` : demoVideoUrl}>
          <img
            src={video.imgUrl}
            alt={video?.title}
            className="videoThumbnail"
          />
        </Link>

        {/* Video Details*/}
        <div className="videoDetail">
          <img src={Channel?.profileImg} alt="" className="video_card_ProfileImg"/>
          <Stack direction="column" alignItems="start" spacing={0.5}>

            <Link to={video._id ? `/video/${video._id}` : demoVideoUrl}>
              {/*Video Title*/}
              <Typography variant="subtitle1" fontSize="16px" fontWeight={500} color="#FFF">
                {video?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
                {video?.title.length > 60 ? "..." : ""}
              </Typography>
            </Link>

            <Link to={Channel._id ? `/channel/${Channel._id}` : demoChannelUrl}>
              {/*Channel name*/}
              <Typography variant="subtitle2" color="grey">
                {Channel?.name || demoChannelTitle}
                <CheckCircle sx={{ fontSize: 12, color: "grey", mk: 5 }} />
              </Typography>
              <Typography variant="subtitle6" fontSize="14px" color="grey">
                {video.views} views • {format(video.createdAt)}
              </Typography>
            </Link>

          </Stack>
        </div>
      </div>
  );
};

export default VideoCard;
