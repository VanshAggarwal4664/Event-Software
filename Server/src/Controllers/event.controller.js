import passport from "passport";
import Event from "../models/event.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadonCloudinary } from "../utils/Cloudinary.js";
import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";



const normalizeDate = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

let currentDate = normalizeDate(new Date())
const registerEvent = asyncHandler(async (req, res) => {
  console.log(req.body)

  const { hostName, eventName, startDate, endDate, time, certified, eventType, description, longDescription, limit } = req.body

  if ([hostName, eventName, description, longDescription].some((field) => {
    return field.trim() === ""
  })) {
    throw new ApiError(400, "All Fields are required")
  }
  console.log(req.files?.eventImage[0]?.path)
  const ImageLocalPath = req.files?.eventImage[0]?.path

  if (!ImageLocalPath) {
    throw new ApiError(400, " logo file is required - multer error")
  }

  const image = await uploadonCloudinary(ImageLocalPath)
  console.log(image?.url)

  if (!image) {
    throw new ApiError(400, " Image file is required-cloudinary error")
  }
  const start = normalizeDate(new Date(startDate))
  const end = normalizeDate(new Date(endDate))

  const event = await Event.create({
    hostName,
    eventName,
    time,
    eventImage: image?.url,
    startDate: start,
    endDate: end,
    certified,
    eventType,
    description,
    longDescription,
    limit,
    createdBy: req.user._id
  })

  if (!event) {
    throw new ApiError(500, "Error Occured while storing data in database")
  }
  console.log(event)
  const user = await User.findByIdAndUpdate(req.user._id,
    {
      $addToSet: { createdEvents: event._id },
      $set: { role: "Host" }
    },
    { new: true, runValidators: true }
  )

  if (!user) {
    throw new ApiError("something went wrong")
  }
  const chat = await Chat.create({
    chatName: `${eventName}-${hostName}`,
    isGroupChat: true,
    users: [req.user._id],
    groupAdmin: req.user._id
  })
  if (!chat) {
    throw new ApiError(500, "Error Occured while creating chat  in database")
  }
  event.eventChatGroup = chat._id;
  event.save({ validateBeforeSave: false })

  console.log(event)
  res.status(200).json(new ApiResponse(200, {}, "Event Register Successfully"))

})

const getApprovalEvent= asyncHandler(async(req,res)=>{
  const events = await Event.find({
    status:"Pending"
  })
  if (events.length == 0) {
   return res.status(200,null,"No Events For Approval")
  }
  res.status(200).json(new ApiResponse(200, { events }, "events fetched Successfully"))
})


const getEventApproved = asyncHandler(async(req,res)=>{
  const {id}= req.params;
  const updateStatus= await Event.findByIdAndUpdate(id,{
    status:'Approved'
  })

  if(!updateStatus){
    throw new ApiError(200,"id is incorrect")
  }
  return res.status(200).json(new ApiResponse(200,{},"Event Approved Successfully"))
})

const getEventRejected = asyncHandler(async(req,res)=>{
  const {id}= req.params;
  const updateStatus= await Event.findByIdAndUpdate(id,{
    status:'Rejected'
  })

  if(!updateStatus){
    throw new ApiError(400,"id is incorrect")
  }
  return res.status(200).json(new ApiResponse(200,{},"Event Rejected Successfully"))
})









const getEvent = asyncHandler(async (req, res) => {
  const events = await Event.find({
    status:"Approved"
  })

  if (!events.length) {
    throw new ApiError(500, "error while fetching events")
  }
  res.status(200).json(new ApiResponse(200, { events }, "events fetched Successfully"))
})

const getOngoingEvent = asyncHandler(async (req, res) => {
  const events = await Event.find({
    joinedUsers:{ $elemMatch: { $eq: req.user._id }},
    startDate: { $lte: currentDate },
    endDate: { $gte: currentDate },
    
  })

  return res.status(200).json(new ApiResponse(200, { events }, "Ongoing Events Fetched Successfully"))
})
const getRecievedCertificate = asyncHandler(async (req, res) => {

  const Recieved= await User.findById(req?.user?._id).select("recievedCertificates").populate("recievedCertificates")
  console.log(Recieved)
  const events = Recieved.populate({
    path: recievedCertificates.event
  })

  console.log(events)
  // const events = await Event.find({
  //   joinedUsers:{ $elemMatch: { $eq: req.user._id }},
  // })
  // return res.status(200).json(new ApiResponse(200, { events:joinedEvents?.joinedEvents,certificate:joinedEvents?.recievedCertificates }, "Joined Events Fetched Successfully"))
})


const getUpcomingEvent = asyncHandler(async (req, res) => {
  const events = await Event.find({
    joinedUsers:{ $elemMatch: { $eq: req.user._id }},
    startDate: { $gt: currentDate }
  })
  return res.status(200).json(new ApiResponse(200, { events }, "Ongoing Events Fetched Successfully"))
})


const getPastEvent = asyncHandler(async (req, res) => {
  const events = await Event.find({
    joinedUsers: { $elemMatch: { $eq: req.user._id } },
    $or: [
      { startDate: { $lte: currentDate }, endDate: { $gte: currentDate } },
      { startDate: { $gt: currentDate } }
    ]
  })
  return res.status(200).json(new ApiResponse(200, { events }, "Past Events Fetched Successfully"))
})

const getEventHistory= asyncHandler(async(req,res)=>{
  const events = await Event.find({
    joinedUsers:{ $elemMatch: { $eq: req.user._id }},
    endDate: { $lt: currentDate }
  })
  return res.status(200).json(new ApiResponse(200, { events }, "Ongoing Events Fetched Successfully"))
})

const getCreatedEvents=asyncHandler(async(req,res)=>{
  let events= await User.findOne({_id:req.user._id}).select('createdEvents').populate('createdEvents')
  events= events.createdEvents

  return res.status(200).json(new ApiResponse(200, { events }, "Created Events Fetched Successfully"))
})

const getJoinedUsers= asyncHandler(async(req,res)=>{
  const {id}=req.params;
  const data= await Event.findById(id,'joinedUsers').populate("joinedUsers","_id username email mobileNumber")

  if(!data){
    throw new ApiError(400,"there is no event with this Id")
  }
  console.log(data);
 
  return res.status(200).json( new ApiResponse(200, data ,"Joined Users Fetched Successfully"))
})


export { registerEvent, getEvent, getOngoingEvent, 
  getUpcomingEvent, getPastEvent,getEventHistory,
  getCreatedEvents,getJoinedUsers,getApprovalEvent,
  getEventApproved,getEventRejected,getRecievedCertificate
}