import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
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
    }

}, {timestamps: true}
);

export default mongoose.model("User", userSchema);