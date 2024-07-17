import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ValidEmail, ValidNumber } from "../utils/ValidData.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

const genrateRefreshandAccessToken = async (userId) => {
  // finding user from the user id and gerating refresh token and access token
  try {
    const user = await User.findById(userId);
    const refreshToken = user.genrateRefreshToken();
    const accessToken = user.genrateAccessToken();
    user.refreshToken = refreshToken;
    // saving the refresh token in the user table
    await user.save({ validateBeforeSave: false })
    return { refreshToken, accessToken, user }

  } catch (error) {
    throw new ApiError(500, "error occured while generating tokens ")
  }

}


const registerUser=asyncHandler(async(req,res)=>{
  // getting info from he body
 const {username, mobileNumber,email,password}= req.body
  
 // checking the data is empty or not
 if([username,mobileNumber,email,password].some((field)=>{
  return field.trim()===""
 })){
    throw new ApiError(400,"User write wrong details")
 }
// checking the email configuration by using ValidEmail utility
 if(!(ValidEmail(email))){
    throw new ApiError(400,"Wrong email")
 }
// checking the number configuration by using ValidNumber utility
 if(!(ValidNumber(mobileNumber))){
    throw new ApiError(400,"user write a wrong number")
 }
// checking the user is already present or not
const existedUser= await User.findOne({
    $or:[{email},{mobileNumber}]
})

if((existedUser)){
    throw new ApiError(400,"user already exist")
}
// creating new user 
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
// console.log(createdUser)
//return response
res.status(201).json(
  new ApiResponse(200, createdUser, "User Registered Successfully")
)

})

const loginUser = asyncHandler(async(req,res)=>{
  // taking email and password from user
  const{email,password}=req.body

  // checking any field is empty or not
  if([email,password].some((field)=>{
      return field.trim()===""
  })){
    throw new ApiError(400,"Please Enter Details")
  }
// checking email configuration is correcty or not
  if(!(ValidEmail(email))){
    const error =new ApiError(400,"Email is Incorrect")
    const jsonError= error.toJson()
    return res.status(200).json(jsonError)
  }
// finding the user with the mail address
  const user= await User.findOne({email})
// not present throw error
  if(!user){
    throw new ApiError(400,"User not found")
  }

  // checking is password is correct or not by using my custom method isPasswordCorrect()
  // in the user Model which return bool value

 const isPasswordValid= await user.isPasswordCorrect(password)
if(!isPasswordValid){
  const error =new ApiError(400,"Password is Incorrect")
    const jsonError= error.toJson()
    return res.status(200).json(jsonError)
}
// genrating a refresh token and  access token
const {accessToken,refreshToken}= await genrateRefreshandAccessToken(user._id)

// finding loggged user and select all field except refreshtoken and password
const LoggedUser= await User.findById(user._id).select("-refreshToken -password")
const options = {
  httpOnly: true,
  secure : true,
}
// sending cookies and the user value
res.status(200) 
.cookie("accessToken", accessToken, options)
.cookie("refreshToken", refreshToken, options)
.json(new ApiResponse(200,{user:LoggedUser,accessToken,refreshToken},"User Logged in SuccessFully"))
})

const getUser= asyncHandler(async(req,res)=>{
  // sending user
    res.status(200).json(new ApiResponse(200,req.user,"User logged in successfully"))
})


const newAcessToken = asyncHandler(async (req, res) => {
  // taking incoming refresh token and acess token
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

// if it is not there it means unautorize request
  if (!incomingRefreshToken) {
    throw new ApiError(401, " Unauthorized Request")
  }

  
  try {
    // decode the token by using jwt
    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

    // finding the user with that decoded token
    const user = await User.findById(decodedToken?._id)

    // if user not found it means the token is invalid
    if (!user) {
      throw new ApiError(401, "invalid refresh token")
    }

    // if refresh token and incoming refresh token is not same it means refresh token is expired
    if (incomingRefreshToken !== user.refreshToken) {
      throw new ApiError(401, "refresh token is expired or used")
    }
     
    // genrating new refresh token and acees token
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