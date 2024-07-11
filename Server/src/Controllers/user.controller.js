import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ValidEmail, ValidNumber } from "../utils/ValidData.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

const genrateRefreshandAccessToken = async (userId) => {
  // iska naam tuser isliye diya h kyukki yeh user token genrate karne wale process ke liye bulaaya h taaki aage kisi se confusion na ho
  try {
    const user = await User.findById(userId);
    const refreshToken = user.genrateRefreshToken();
    const accessToken = user.genrateAccessToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false })
    return { refreshToken, accessToken, user }

  } catch (error) {
    throw new ApiError(500, "error occured while generating tokens ")
  }

}




const registerUser=asyncHandler(async(req,res)=>{
 const {username, mobileNumber,email,password}= req.body
  
 if([username,mobileNumber,email,password].some((field)=>{
  return field.trim()===""
 })){
    throw new ApiError(400,"User write wrong details")
 }

 if(!(ValidEmail(email))){
    throw new ApiError(400,"Wrong email")
 }

 if(!(ValidNumber(mobileNumber))){
    throw new ApiError(400,"user write a wrong number")
 }
const existedUser= await User.findOne({
    $or:[{email},{mobileNumber}]
})

if((existedUser)){
    throw new ApiError(400,"user already exist")
}

const user = await User.create({
    username,
    email,
    mobileNumber,
    password,
})

const createdUser = await User.findById(user._id).select("-password -refreshToken")

//check for user creation
if (!createdUser) {
  throw new ApiError(500, "something went wrong while registering the user")
}
console.log(createdUser)
//return response
res.status(201).json(
  new ApiResponse(200, createdUser, "User Registered Successfully")
)

})

const loginUser = asyncHandler(async(req,res)=>{
  const{email,password}=req.body

  if([email,password].some((field)=>{
      return field.trim()===""
  })){
    throw new ApiError(400,"Please Enter Details")
  }

  if(!(ValidEmail(email))){
    const error =new ApiError(400,"Email is Incorrect")
    const jsonError= error.toJson()
    return res.status(200).json(jsonError)
  }

  const user= await User.findOne({email})

  if(!user){
    throw new ApiError(400,"User not found")
  }

 const isPasswordValid= await user.isPasswordCorrect(password)
if(!isPasswordValid){
  const error =new ApiError(400,"Password is Incorrect")
    const jsonError= error.toJson()
    return res.status(200).json(jsonError)
}

const {accessToken,refreshToken}= await genrateRefreshandAccessToken(user._id)

const LoggedUser= await User.findById(user._id).select("-refreshToken -password")
const options = {
  httpOnly: true,
  secure : true,
}

res.status(200) 
.cookie("accessToken", accessToken, options)
.cookie("refreshToken", refreshToken, options)
.json(new ApiResponse(200,{user:LoggedUser,accessToken,refreshToken},"User Logged in SuccessFully"))
})

const getUser= asyncHandler(async(req,res)=>{
    res.status(200).json(new ApiResponse(200,req.user,"User logged in successfully"))
})


const newAcessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, " Unauthorized Request")
  }
  try {
    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id)
    if (!user) {
      throw new ApiError(401, "invalid refresh token")
    }

    if (incomingRefreshToken !== user.refreshToken) {
      throw new ApiError(401, "refresh token is expired or used")
    }

    const { newAccessToken, newRefreshToken } = await genrateRefreshandAccessToken(user._id)
    const options = {
      httpOnly: true,
      secure: true
    }
    //  cookie("accessToken",accessToken,options) first is key second is value and last is option which we define earlier 
    return res.status(200)
      .cookie("accessToken", newAccessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(200, { user: user, accessToken: newAccessToken, refreshToken: newRefreshToken }, "Token Regenrated successfully")
      )
  } catch (error) {
    throw new ApiError(401, error?.message || "invalid Token")
  }


})

export {registerUser,getUser,loginUser,newAcessToken}