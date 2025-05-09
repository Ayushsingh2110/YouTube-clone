import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String
    },
    description:{
        type: String,
    },
    profileImg:{
        type: String,
    },
    templateImg:{
        type: String,
    },
    subscribers:{
        type: Number,
        default: 0
    },
    subscribedUsers:{
        type: [String],
        default:[]
    },
    likedVideos:{
        type: [String],
        default:[]
    },
    watchHistory: {
        type: [String],
        default: []
    },
    fromGoogle:{
        type: Boolean,
        default:false
    }

}, {timestamps: true}
);

export default mongoose.model("User", userSchema);