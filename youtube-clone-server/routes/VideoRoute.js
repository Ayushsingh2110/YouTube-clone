import express from "express";
import { addView, createVideo, deleteVideo, getByTag, getVideo, randomVideos, search, subscriptionVideos, trendingVideos, updateVideo } from "../controllers/VideoControl.js";
import { verifyToken } from "../utils/verifyToken.js";

const Router = express.Router();

//create a video
Router.post("/addVideo", verifyToken, createVideo);
Router.put("/update/:videoId", verifyToken, updateVideo);
Router.delete("/delete/:videoId", verifyToken, deleteVideo);
Router.get("/subscription", verifyToken, subscriptionVideos);
Router.get("/random", randomVideos);
Router.get("/trending", trendingVideos);
Router.get("/tags", getByTag);
Router.get("/delete/:videoId", getVideo);
Router.get("/delete/:videoId", search);
Router.put("/view/:videoId", addView)

export default Router;