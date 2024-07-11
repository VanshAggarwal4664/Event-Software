import { Router } from "express";
import { createChat, createSingleChat, getChats } from "../Controllers/chat.controller.js";
import VerifyUser from "../middlewares/VerifyUser.js";

const router= Router()


router.route('/create').post(VerifyUser, createChat)
router.route('/singleChat/:id').get(VerifyUser,createSingleChat)
router.route('/allchats').get(VerifyUser, getChats)


export default router