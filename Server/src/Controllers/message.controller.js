import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadonCloudinary } from "../utils/Cloudinary.js";




const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatid } = req.body
  console.log(content, chatid)

  if (!(chatid && content)) {
    throw new ApiError(400, "wrong way of sending")
  }


  let message = await Message.create({
    sender: req.user._id,
    content,
    chat: chatid
  })

  message = await message.populate("sender", "name email")
  message = await message.populate("chat")
  message = await User.populate(message, {
    path: 'chat.users',
    select: "name email"
  })
  await Chat.findByIdAndUpdate(chatid, {
    latestMessage: message
  });
  res.status(200).json(new ApiResponse(200, message, "message save successfully"))
})

const sendFile = asyncHandler(async (req, res) => {
  const { content, chatid } = req.body
  console.log(content, chatid)
  const uploadedFiles = [];
  console.log(req.files)
  if (!(chatid)) {
    throw new ApiError(400, "wrong way of sending")
  }



  const uploadPromises = await req?.files?.map(async(file) => {
    try {
      const response = await uploadonCloudinary(file?.path)
      uploadedFiles.push({
        url: response?.url,
        public_id: response?.public_id,
        format: response?.format
      })
      console.log(uploadedFiles)
    } catch (error) {
      console.log(error)
    }
  })
    await Promise.all(uploadPromises)
    console.log(uploadPromises)
  let message = await Message.create({
    sender: req.user._id,
    content,
    chat: chatid,
    attachments: uploadedFiles
  })
  message = await message.populate("sender", "username email")
  message = await message.populate("chat")
  message = await User.populate(message, {
    path: 'chat.users',
    select: "username email"
  })
  await Chat.findByIdAndUpdate(chatid, {
    latestMessage: message
  });
  console.log(message)
  res.status(200).json(new ApiResponse(200, message, "message save successfully"))

 
})




const fetchAllMessages = asyncHandler(async(req, res) => {
  const { chatid } = req.params

  if (chatid == "null") {
    return res.status(200).json({})
  }
  console.log(req.params)

  const allmessages = await Message.find({ chat:chatid }).populate("sender", "username email").populate("chat")
  console.log(allmessages)
  return res.status(200).json(new ApiResponse(200, allmessages, "messages fetched Successfully"))
})

export { sendMessage, fetchAllMessages, sendFile }