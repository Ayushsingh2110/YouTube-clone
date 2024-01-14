import express from "express";
import { deleteUser, dislikeVideo, getUser, likeVideo, subUser, test, unsubUser, updateUser } from "../controllers/UserControl.js";
import { verifyToken } from "../utils/verifyToken.js";

const Router = express.Router();

//get user
Router.get("/find/:userId", getUser);

//update user
Router.put("/update/:userId", verifyToken, updateUser);

//delete user
Router.delete("/delete/:userId",verifyToken,  deleteUser);

//subscribe user
Router.put("/sub/:userId",  verifyToken, subUser);

//unsubscribe user
Router.put("/unsub/:userId",  verifyToken, unsubUser);

//like a video
Router.put("/like/:videoId",  verifyToken, likeVideo);

//dislike a video
Router.put("/dislike/:videoId",  verifyToken, dislikeVideo);

export default Router;