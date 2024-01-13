import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/UserRoute.js";
import videoRouter from "./routes/VideoRoute.js";
import commentRouter from "./routes/CommentRoute.js";
import authRouter from "./routes/AuthRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

dotenv.config()

const connect = () => {
    mongoose.connect(process.env.MONGO_DB).then(() => {
        console.log("connected to DB");
    }).catch((err) => { throw err })
}

//dependencies
app.use(express.json());
app.use(cookieParser());

//cors
app.use(cors({
  credentials:true,
  origin:['http://localhost:3000']
}))

//routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/video", videoRouter);
app.use("/api/comment", commentRouter);

//error handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
      success: false,
      status,
      message,
    });
  });

//connecting to port
const port = 8800
app.listen(port, () => {
    connect();
    console.log(`connected to port ${port}`);
})