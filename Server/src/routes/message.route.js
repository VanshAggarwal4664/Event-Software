import { Router } from "express";
import VerifyUser from "../middlewares/VerifyUser.js";
import { upload } from "../middlewares/multer.middleware.js";
import { fetchAllMessages, sendFile, sendMessage } from "../Controllers/message.controller.js";

const router= Router()

// route for sending message
router.route('/send').post(VerifyUser,sendMessage)

// route for sending files
router.route('/sendfile').post(VerifyUser, upload.array('files',4)  ,sendFile)

// route for fetching all messages for particular chat
router.route('/:chatid').get(VerifyUser,fetchAllMessages)

export default router