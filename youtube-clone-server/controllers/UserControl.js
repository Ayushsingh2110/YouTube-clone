import User from "../models/UserModel.js";
import { createError } from "../utils/error.js";

export const test = () => {
    console.log("test is working!");
}

//Get user data
export const getUser = async (req, res, next) => {
    try {
        const userDetails = await User.findById(req.params.userId);
        res.status(200).json(userDetails);
    } catch (err) {
        next(err);
    }
}

//Update user account
export const updateUser = async (req, res, next) => {
    if (req.params.userId == req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
                $set: req.body,
            },
                { new: true });
            res.status(200).json(updatedUser);
        } catch (err) {
            next(err);
        }
    } else {
        return next(createError(403, "You cannot update this account!"));
    }
}

//Delete user account
export const deleteUser = async (req, res, next) => {
    if (req.params.userId == req.user.id) {
        try {
            await User.findByIdAndDelete(req.params.userId);
            res.status(200).json("Account deleted !");
        } catch (err) {
            next(err);
        }
    } else {
        return next(createError(403, "You cannot delete this account!"));
    }
}

//Subscribing channel
export const subUser = async (req, res, next) => {
    try {
        //adding channel id in User's subscription array
        await User.findByIdAndUpdate(req.user.id, {
            $addToSet: { subscribedUsers: req.params.userId }
        });
        //incrementing subscriber count of channel subscribed
        await User.findByIdAndUpdate(req.params.userId, {
            $inc : {subscribers : 1}
        })
        res.status(200).json("Subscribbed !!")
    } catch (err) {
        next(err);
    }
}

//Unsubscribing channel
export const unsubUser = async (req, res, next) => {
    try {
        //removing channel id in User's subscription array
        await User.findByIdAndUpdate(req.user.id, {
            $pull: { subscribedUsers: req.params.channelId }
        });
        //Decrementing subscriber count of channel subscribed
        await User.findByIdAndUpdate(req.params.userId, {
            $inc : {subscribers : -1}
        })
        res.status(200).json("Unsubscribbed !!")
    } catch (err) {
        next(err);
    }
}

export const likeVideo = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
      await Video.findByIdAndUpdate(videoId,{
        $addToSet:{likes:id},
        $pull:{dislikes:id}
      })
      res.status(200).json("The video has been liked.")
    } catch (err) {
      next(err);
    }
  };
  
  export const dislikeVideo = async (req, res, next) => {
      const id = req.user.id;
      const videoId = req.params.videoId;
      try {
        await Video.findByIdAndUpdate(videoId,{
          $addToSet:{dislikes:id},
          $pull:{likes:id}
        })
        res.status(200).json("The video has been disliked.")
    } catch (err) {
      next(err);
    }
  };