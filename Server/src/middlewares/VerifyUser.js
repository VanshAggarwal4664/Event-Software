import  jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const VerifyUser= asyncHandler(async(req,res,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");

        if(!token){
            throw new ApiError(400,"Please Login")
        }

        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

        const user= await User.findById(decodedToken._id).select("-refreshToken -password")

        if (!user){
            throw new ApiError(401,"invalid access token")
           }

           req.user=user
           next()
    } catch (error) {
        console.log(error)
        throw new ApiError(400,"error occured")
    }
})

export default VerifyUser