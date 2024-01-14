import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

//User registration
export const signUp = async (req, res, next) => {
    try {

        //getting password from request
        const { password } = req.body;

        //hashing password
        const hashPass = bcrypt.hashSync(password, 10);

        //creating new user including hashed password
        const user = new User({
            ...req.body,
            password: hashPass,
        });

        //saving user data in DB
        await user.save();

        //response
        res.status(200).send("New user is registered!");
    } catch (error) {
        next(error);
    }
}

//User SignIn
export const signIn = async (req, res, next) => {
    try {
        //checking user is already registered or not
        const user = await User.findOne({ email: req.body.email });
        if (!user) return next(createError(404, "Wrong username OR please signup if you don't have any account"));

        //checking enterd password is same as encrypted password stored in DB
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) return next(createError(400, "Wrong password!!"))

        //creating token
        const token = jwt.sign({ id: user._id }, process.env.JWT)

        //removing password from user._doc for security
        const {password, ...others} = user._doc;

        //sending generated token and 'others' user data without password
        res.cookie("access_token", token, { httpOnly: true }).status(200).json(others);

    } catch (error) {
        next(error);
    }
}


export const googleAuth = async (req,res,next) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(user){
            const token = jwt.sign({id: user._id}, process.env.JWT);
            res.cookie("access_token", token, {
                httpOnly: true,
            }).status(200).json(user._doc);
        }else{
            const user = new User({
                ...req.body,
                fromGoogle: true
            })
            const userSave = await user.save() 

            const token = jwt.sign({id: userSave._id}, process.env.JWT);
            res.cookie("access_token", token, {
                httpOnly: true,
            }).status(200).json(userSave._doc);
        }
    } catch (error) {
        next(error);
    }
}