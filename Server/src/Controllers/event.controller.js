import passport from "passport";
import Event from "../models/event.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadonCloudinary } from "../utils/Cloudinary.js";
import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";


// this function normalize the today date to make comparison and fetch the events according to that

const normalizeDate = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};
// this variable is used in many functions
let currentDate = normalizeDate(new Date())

// register the new event in the database
const registerEvent = asyncHandler(async (req, res) => {
  // taking event data from the frontend
  const { hostName, eventName, startDate, endDate, time, certified, eventType, description, longDescription, limit } = req.body
 
  // checking field is present or not
  if ([hostName, eventName, description, longDescription].some((field) => {
    return field.trim() === ""
  })) {
    throw new ApiError(400, "All Fields are required")
  }
  console.log(req.files?.eventImage[0]?.path)
  // checking event image path
  const ImageLocalPath = req.files?.eventImage[0]?.path
// if local file path is not present 
  if (!ImageLocalPath) {
    throw new ApiError(400, " logo file is required - multer error")
  }
// uploading image to cloudinary
  const image = await uploadonCloudinary(ImageLocalPath)
  console.log(image?.url)

  // checking Error
  if (!image) {
    throw new ApiError(400, " Image file is required-cloudinary error")
  }
  //normalizing the date to save date in database
  const start = normalizeDate(new Date(startDate))
  const end = normalizeDate(new Date(endDate))


  // creating new event with the data
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
// checking event successfully save or not
  if (!event) {
    throw new ApiError(500, "Error Occured while storing data in database")
  }
  // console.log(event)
  // updating the created events in user table
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
  // creating a group chat in which the admin is the host of event and the first user as the member of event 
  const chat = await Chat.create({
    chatName: `${eventName}-${hostName}`,
    isGroupChat: true,
    users: [req.user._id],
    groupAdmin: req.user._id
  })
  if (!chat) {
    throw new ApiError(500, "Error Occured while creating chat  in database")
  }
  // storing the eventChatGroup Id in event table
  event.eventChatGroup = chat._id;
  event.save({ validateBeforeSave: false })

  // console.log(event)
  res.status(200).json(new ApiResponse(200, {}, "Event Register Successfully"))

})
// get approval events list
const getApprovalEvent= asyncHandler(async(req,res)=>{
  // finding all the events which are pending
  const events = await Event.find({
    status:"Pending"
  })
  // if there is no event it give a respons of no events for approval
  if (events.length == 0) {
   return res.status(200,null,"No Events For Approval")
  }
  res.status(200).json(new ApiResponse(200, { events }, "events fetched Successfully"))
})

// approved the specific event
const getEventApproved = asyncHandler(async(req,res)=>{
  // taking event id from the params which is approved by the super admin
  const {id}= req.params;
  const updateStatus= await Event.findByIdAndUpdate(id,{
    status:'Approved'
  })

  if(!updateStatus){
    throw new ApiError(200,"id is incorrect")
  }
  return res.status(200).json(new ApiResponse(200,{},"Event Approved Successfully"))
})

// reject the particular event
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


// fetching all the event which have status approved
const getEvent = asyncHandler(async (req, res) => {
  const events = await Event.find({
    status:"Approved"
  })

  if (!events.length) {
    throw new ApiError(500, "error while fetching events")
  }
  res.status(200).json(new ApiResponse(200, { events }, "events fetched Successfully"))
})
// it fetch all the events which are ongoing  and which are joined by the user
const getOngoingEvent = asyncHandler(async (req, res) => {
  const events = await Event.find({
    joinedUsers:{ $elemMatch: { $eq: req.user._id }},
    startDate: { $lte: currentDate },
    endDate: { $gte: currentDate },
    
  })

  return res.status(200).json(new ApiResponse(200, { events }, "Ongoing Events Fetched Successfully"))
})


const getRecievedCertificate = asyncHandler(async (req, res) => {
  // finding is there any recieved certificate or not
  const certificate= await User.findById(req?.user?._id).select("recievedCertificates").populate("recievedCertificates")

  if(!(certificate.length)){
    res.status(200).json(new ApiResponse(200,{},"no certificates found"))
  }
  let events= await User.findById(req?.user?._id).select("joinedEvents").populate("joinedEvents")

  // console.log(certificate.recievedCertificates );
  // console.log(events.joinedEvents);

 // finding events from which certificate is recieved
  events=  events.joinedEvents.filter((single)=>{
    return certificate.recievedCertificates.map((cert)=>{
      if(cert.event.equals(single._id)){
        return true;
      }
      return false
    })
  })
  // if(Recieved.recievedCertificates.length==0){
  //   return res.status(200).json(new ApiResponse(200,null, "Joined Events Fetched Successfully"))
  // }
 
  //  await Recieved.populate({
  //   path: "recievedCertificates",
  //   populate:{
  //     path: "event",
  //     model: "Event"
  //   }
  // })
 return res.status(200).json(new ApiResponse(200,{events},"Certificate Fetched Successfully"))  
})

// fetching all the upcoming event and which are joined by the user
const getUpcomingEvent = asyncHandler(async (req, res) => {
  const events = await Event.find({
    joinedUsers:{ $elemMatch: { $eq: req.user._id }},
    startDate: { $gt: currentDate }
  })
  return res.status(200).json(new ApiResponse(200, { events }, "Ongoing Events Fetched Successfully"))
})

// fetching the event which is joined by the user and upcoming and ongoing both
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
// fetching all the evennts which is joined by user and the event are completed
const getEventHistory= asyncHandler(async(req,res)=>{
  const events = await Event.find({
    joinedUsers:{ $elemMatch: { $eq: req.user._id }},
    endDate: { $lt: currentDate }
  })
  return res.status(200).json(new ApiResponse(200, { events }, "Ongoing Events Fetched Successfully"))
})
// fetching the events which are created by the user
const getCreatedEvents=asyncHandler(async(req,res)=>{
  let events= await User.findOne({_id:req.user._id}).select('createdEvents').populate('createdEvents')
  events= events.createdEvents

  return res.status(200).json(new ApiResponse(200, { events }, "Created Events Fetched Successfully"))
})
// fetching all the joined user of the particular event
const getJoinedUsers= asyncHandler(async(req,res)=>{
  const {id}=req.params;
  const data= await Event.findById(id,'joinedUsers').populate("joinedUsers","_id username email mobileNumber")

  if(!data){
    throw new ApiError(400,"there is no event with this Id")
  }
  console.log(data);
 
  return res.status(200).json( new ApiResponse(200, data ,"Joined Users Fetched Successfully"))
})
// fetching the particular event
const getSingleEvent= asyncHandler(async(req,res)=>{
  const {id}=req.params
  console.log(id);


  if(!id){
    throw new ApiError(400,"id not recieved")
  }
  
  const event= await Event.findOne({eventChatGroup:id});
  if(!event){
    throw new ApiError(400,"Event not Found")
  }
  return res.status(200).json(new ApiResponse(200,event,"Id found for this chat group"));
})


export { registerEvent, getEvent, getOngoingEvent, 
  getUpcomingEvent, getPastEvent,getEventHistory,
  getCreatedEvents,getJoinedUsers,getApprovalEvent,
  getEventApproved,getEventRejected,getRecievedCertificate,getSingleEvent
}