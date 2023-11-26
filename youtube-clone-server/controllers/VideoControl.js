import { createError } from "../utils/error.js";
import Video from "../models/VideoModel.js";
import User from "../models/UserModel.js";

//Create video
export const createVideo = async (req, res, next) => {
    const newVideo = new Video({ userId: req.user.id, ...req.body });
    try {
        const savedVideo = await newVideo.save();
        res.status(200).json(savedVideo)
    } catch (err) {
        next(err);
    }
}

//Update video
export const updateVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.videoId);
        if (!video) return next(createError(404, "Video not found !"))

        if (req.user.id === video.userId) {
            const updatedVideo = await Video.findByIdAndUpdate(re1.params.videoId,
                {
                    $set: req.body,
                },
                { new: true }
            );
        } else {
            next(createError(403, "You cannot update this video !"));
        }
        res.status(200).json(updatedVideo);
    } catch (err) {
        next(err);
    }
}

//Delete video
export const deleteVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.videoId);
        if (!video) return next(createError(404, "Video not found !"))

        if (req.user.id === video.userId) {
            await Video.findByIdAndDelete(req.params.videoId);
        } else {
            next(createError(403, "You cannot delete this video !"));
        }
        res.status(200).json("Video Deleted !");
    } catch (err) {
        next(err);
    }
}

//Get details of video
export const getVideo = async (req, res, next) => {
    try {
        const videoDetail = await Video.findById(req.params.videoId);
        res.status(200).json(videoDetail)
    } catch (err) {
        next(err);
    }
}

//Increment view
export const addView = async (req, res, next) => {
    try {
        await Video.findByIdAndUpdate(req.params.videoId , {
            $inc: { views: 1 }
        })
        res.status(200).json("View added")
    } catch (err) {
        next(err);
    }
}

//Random videos 
export const randomVideos = async (req, res, next) => {
    try {
        const randomVideos = await Video.aggregate(
            [{ $sample: { size: 40 } }]
        );
        res.status(200).json(randomVideos);
    } catch (err) {
        next(err);
    }
}

//Trending videos
export const trendingVideos = async (req, res, next) => {
    try {
        const trendingVideos = await Video.find().sort({views: -1});
        res.status(200).json(trendingVideos)
    } catch (err) {
        next(err);
    }
}

//subscription videos
export const subscriptionVideos = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        const subscribbedChannels = user.subscribedUsers;
        const subVideosList = await Promise.all(
            subscribbedChannels.map((channelId) => {
                return Video.find({ userId: channelId})
            })
        )
        res.status(200).json(subVideosList.flat().sort((a, b) => b.createdAt - a.createdAt));
    } catch (err) {
        next(err);
    }
}

//get video list by tags
export const getByTag = async (req, res, next) => {
    const tags = (req.query.tags).split(",");
    try{
        const tagVideos = await Video.find({tags : { $in: tags}}).limit(20);
        res.status(200).json(tagVideos);
    }catch(err){
        next(err);
    }
}

//get video by search
export const search = async(req,res,next) => {
    const searchQuery = req.query.q;
    try {
        const searchVideos = await Video.find({ title: { $regex: searchQuery, $options: "i" }});
        res.status(200).json(searchVideos);
    } catch (err) {
        next(err);
    }
}