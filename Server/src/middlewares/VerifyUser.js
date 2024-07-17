import  jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const VerifyUser= asyncHandler(async(req,res,next)=>{

    try {
        // getting token from the client
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");
 // if there is no token that means user have to login
        if(!token){
            throw new ApiError(400,"Please Login")
        }
   // decoded the token by using jwt
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
  
        // finding the user from decoded token 
        const user= await User.findById(decodedToken._id).select("-refreshToken -password")
    
        // user not found means invalid access token
        if (!user){
            throw new ApiError(401,"invalid access token")
           }
// putting the req.user value equals to user so we can access it through out
           req.user=user
           next()
    } catch (error) {
        console.log(error)
        throw new ApiError(400,"error occured")
    }
})

export default VerifyUser