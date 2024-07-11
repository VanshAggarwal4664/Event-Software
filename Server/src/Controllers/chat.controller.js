import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";
import Event from "../models/event.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const createChat= asyncHandler(async(req,res)=>{
   const {id,eventId}=req.body
   console.log(req.user._id)
   const updatedChat = await Chat.findByIdAndUpdate(
    id,
    { $addToSet: { users: req.user._id } },
    { new: true, runValidators: true }
  );
    if(!updatedChat){
        throw new ApiError(500,"while Fetching the chat")
    }
     const event = await Event.findByIdAndUpdate(eventId,
        { $addToSet:{joinedUsers:req.user._id} }, 
        { new: true }
     )
     if(!event){
        throw new ApiError("500","Event data is not saved")
     }

     const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $addToSet: { joinedEvents: eventId }
        },
        { new: true }
    );
     if(!user){
        throw new ApiError("500","Event data is not saved")
     }
    res.status(200).json(new ApiResponse(200,{},"Chat Created Successfully"))
}
)

const createSingleChat= asyncHandler(async(req,res)=>{
    const {id}=req.params
      console.log(id)
    if(!id) throw new ApiError("400","id is not present")

    let chat= await Chat.find({
        isGroupChat:false,
        $and:[
            {
                users:{$elemMatch:{$eq: req.user._id}}
            },
            {
                users:{$elemMatch:{$eq: id}}
            }
        ]
    }).populate("users","username email").populate("latestMessage")
    console.log(chat)

    chat= await User.populate(chat,{
        path:"latestMessage.sender",
        select:"username email"
    })

    if(!chat.length>0){
        const newchat= Chat.create({
            isGroupChat:false,
            users:[req.user._id,id]
        })
        const createdChat= Chat.findOne({_id:newchat._id}).populate("users","username email")
        console.log(createChat)
        
        res.status(200).json(new ApiResponse(200,newchat,"chat created successfully"))
    }else{
        res.status(200).json(new ApiResponse(200,chat,"chat already exist"))
    } 
})

const getChats= asyncHandler(async(req,res)=>{ 
    const chats = await Chat.find({ users: { $in: [req.user._id] } })
    .populate("users",'username email')
    .populate("groupAdmin",'username email')
    .populate("latestMessage")

    if(!chats.length){
        throw new ApiError(500,"no chat found")
    }
    res.status(200).json(new ApiResponse(200,chats,"Chat Found"))
    
})



export {createChat,getChats,createSingleChat}