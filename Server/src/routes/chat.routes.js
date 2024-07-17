import { Router } from "express";
import { createChat, createSingleChat, getChats } from "../Controllers/chat.controller.js";
import VerifyUser from "../middlewares/VerifyUser.js";

const router= Router()

// route for creating a new group chat
router.route('/create').post(VerifyUser, createChat)

// route for creating a single chat one o one
router.route('/singleChat/:id').get(VerifyUser,createSingleChat)

 // route for fetching all the chats in which logged in user is present
router.route('/allchats').get(VerifyUser, getChats)


export default router