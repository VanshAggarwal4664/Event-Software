import { Router } from "express";
import VerifyUser from "../middlewares/VerifyUser.js";
import { upload } from "../middlewares/multer.middleware.js";
import { fetchAllMessages, sendFile, sendMessage } from "../Controllers/message.controller.js";

const router= Router()

router.route('/send').post(VerifyUser,sendMessage)
router.route('/sendfile').post(VerifyUser, upload.array('files',4)  ,sendFile)
router.route('/:chatid').get(VerifyUser,fetchAllMessages)

export default router