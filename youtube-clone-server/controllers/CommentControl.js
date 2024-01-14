import Comment from "../models/CommentModel.js";
import { createError } from "../utils/error.js";

export const addComment = async(req, res, next) => {
    const comment = new Comment({userId: req.user.id, ...req.body});
    try{
        const addedComment = await comment.save();
        res.status(200).json(addedComment);
    }catch(err){
        next(err);
    }
}

export const deleteComment = async(req, res, next) => {
    try{
        const currentComment = await Comment.findById(res.params.id);
        const currentVideo = await Video.findById(res.params.id);
        if(currentComment.userId == req.user.id || req.user.id == currentVideo.userId){
            await Comment.findByIdAndDelete(currentComment.id);
            res.status(200).json("Comment has been deleted!")
        }else{
            next(createError(403, "You can not delete this comment!"))
        }
    }catch(err){
        next(err);
    }
}

export const getComments = async(req, res, next) => {
    try{
        const allComments = await Comment.find({videoId: req.params.videoId});
        res.status(200).json(allComments);
    }catch(err){
        next(err);
    }
}

