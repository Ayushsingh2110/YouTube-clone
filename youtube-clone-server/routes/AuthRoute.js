import express from "express";
import { signUp, signIn, googleAuth } from "../controllers/AuthControl.js";

const Router = express.Router();

//CREATE A USER
Router.post("/signup", signUp);

//SIGN IN
Router.post("/signin", signIn);

//GOOGLE AUTH
Router.post("/google", googleAuth);

export default Router;