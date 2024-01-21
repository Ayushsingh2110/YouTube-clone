import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { CommentSection, RecommendedVideos, Videos } from "../components";
import {
  fetchFromAPI,
  fetchFromserver,
  postToServer,
  putToServer,
} from "../utils/fetchFromAPI";
import { demoProfilePicture } from "../utils/constant";

import { CheckCircle } from "@mui/icons-material";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

import styled from "styled-components";
import {
  dislike,
  like,
  videoFetchFailure,
  videoFetchStart,
  videoFetchSuccess,
} from "../redux/videoSlice";
import { subscription } from "../redux/userSlice";
import { format } from "timeago.js";

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  font-size: 18px;

  @media (max-width: 1024px){
    font-size: 12px;
  }

`;

const ChannelName = styled.h6`
  font-size: 16px;
  color: #fff;
  margin: 0;
  @media (max-width: 1024px){
    font-size: 14px;
  }
  @media (max-width: 768px){
    font-size: 12px;
  }
`
const ChannelCard = styled.div`
  display: flex;
  gap: 10px;
  
  @media (max-width: 768px){
    width: 100%;
    justify-content: space-between;
  }
`
const VideoDetail = ({ setShowSidebar }) => {
  const { currentUser } = useSelector((state) => state.user);
  const currentVideo = useSelector((state) => state.video.currentVideo);
  const dispatch = useDispatch();

  let recomm_video_flexDirection = "column";
  if (window.innerWidth < 900) {
    recomm_video_flexDirection = "row";
  }

  const { id } = useParams();

  const [channelDetails, setChannelDetails] = useState();
  const [IsOpen, setIsOpen] = useState(false);

  const GetDataFromAPI = async () => {
    dispatch(videoFetchStart());
    try {
      const fetchedVideo = await fetchFromserver(`video/find/${id}`);
      if (fetchedVideo) {
        dispatch(videoFetchSuccess(fetchedVideo));

        const channelId = fetchedVideo.userId;
        const fetchedChannel = await fetchFromserver(`user/find/${channelId}`);
        if (fetchedChannel) {
          setChannelDetails(fetchedChannel);
        }
      }
    } catch (error) {
      dispatch(videoFetchFailure());
      console.error(error);
    }
  };

  const addViews = async () => {
    if (currentUser?._id !== currentVideo?.userId) {
      const userId = currentUser?._id;
      try {
        await putToServer(`video/view/${currentVideo?._id}`, { userId });
      } catch {
        console.log("view not added");
      }
    }
  };

  useEffect(() => {
    GetDataFromAPI();
    addViews();
  }, [id, dispatch]);

  const [showReadMoreBtn, setReadMoreBtn] = useState(true);
  const desc_ref = useRef(null);
  useEffect(() => {
    if (desc_ref.current) {
      setReadMoreBtn(
        desc_ref.current.scrollHeight > desc_ref.current.clientHeight
      );
    }
  }, []);

  if (!currentVideo) {
    return <div>Loading...</div>; // Or another loading indicator
  }

  const handleLike = async () => {
    try {
      await putToServer(`user/like/${currentVideo?._id}`);
      dispatch(like(currentUser?._id));
    } catch (err) {
      console.log(`from videoDetail: ${err}`);
    }
  };

  const handleDislike = async () => {
    await putToServer(`user/dislike/${currentVideo?._id}`);
    dispatch(dislike(currentUser?._id));
  };

  const handleSub = async () => {
    currentUser?.subscribedUsers.includes(channelDetails?._id)
      ? await putToServer(`user/unsub/${channelDetails?._id}`)
      : await putToServer(`user/sub/${channelDetails?._id}`);
    dispatch(subscription(channelDetails?._id));
  };

  const handleShareClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentVideo.title,
          text: currentVideo.description,
          url: window.location.href,
        });
        console.log("Shared successfully");
      } catch (error) {
        console.error("Error sharing:", error.message);
      }
    } else {
      console.log("Web Share API not supported");
    }
  };

  return (
    <div className="video_page_container">
      <div className="video_page_content">
        {/*Video Player*/}
        <div className="video-container">
          <video className="react-player" controls>
            <source src={currentVideo.videoUrl}></source>
          </video>
        </div>

        {/* Video Title */}
        <h1 className="video_title">{currentVideo?.title}</h1>

        <div className="video_details">
          <ChannelCard>
            <Box sx={{ display: "flex", gap: "10px" }}>
              <Link to={`/channel/${channelDetails?._id}`}>
                {/* Channel Avatar */}
                <Avatar
                  src={channelDetails?.profileImg || demoProfilePicture}
                  alt={channelDetails?.name}
                  className="miniProfileImg"
                />
              </Link>

              <div className="channel_details">
                <Link
                  to={`/channel/${channelDetails?._id}`}
                  style={{ display: "Flex", alignItems: "center" }}
                >
                  <ChannelName>
                    {channelDetails?.name}
                    <CheckCircleIcon
                      sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                    />
                  </ChannelName>
                </Link>

                <span className="sub_count">
                  {channelDetails?.subscribers} subscribers
                </span>
              </div>
            </Box>

            {currentUser?._id !== currentVideo.userId && (
              <button className="subscribe_button" onClick={handleSub}>
                {currentUser?.subscribedUsers?.includes(channelDetails?._id)
                  ? "Subscribed"
                  : "Subscribe"}
              </button>
            )}
          </ChannelCard>

          <div className="video_buttons">
            <Button onClick={handleLike} sx={{}}>
              {currentVideo.likes?.includes(currentUser?._id) ? (
                <ThumbUpIcon />
              ) : (
                <ThumbUpOutlinedIcon />
              )}{" "}
              {currentVideo.likes.length}
            </Button>

            <Button onClick={handleDislike}>
              {currentVideo.dislikes?.includes(currentUser?._id) ? (
                <ThumbDownIcon />
              ) : (
                <ThumbDownOffAltOutlinedIcon />
              )}{" "}
            </Button>

            <Button onClick={handleShareClick}>
              <ReplyOutlinedIcon /> Share
            </Button>

            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </div>
        </div>

        <div className="video_description">
          <Typography
            variant="subtitle6"
            fontSize="13px"
            color="azure"
            fontWeight={600}
          >
            {currentVideo.views} views &nbsp;&nbsp;
            {format(currentVideo.createdAt)}
          </Typography>
          <p
            className={IsOpen ? null : "read_Less_Para"}
            style={{ color: "azure" }}
            ref={desc_ref}
          >
            {currentVideo.description}
          </p>
          {showReadMoreBtn && (
            <span
              className="read_moreLess_btn"
              onClick={() => setIsOpen(!IsOpen)}
            >
              {IsOpen ? "read Less" : "read more..."}
            </span>
          )}
        </div>

        <CommentSection videoId={currentVideo?._id} />
      </div>

      <Box
        px={2}
        py={{ md: 1, xs: 5 }}
        justifyContent="center"
        alignItems="center"
        flex={0.3}
      >
        <RecommendedVideos tags={currentVideo.tags} />
      </Box>
    </div>
  );
};

export default VideoDetail;
