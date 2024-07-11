import { Router } from "express";
import { getApprovalEvent, getCreatedEvents, getEvent, getEventApproved, getEventHistory, getEventRejected, getJoinedUsers, getOngoingEvent, getPastEvent, getRecievedCertificate, getUpcomingEvent, registerEvent } from "../Controllers/event.controller.js";
import VerifyUser from "../middlewares/VerifyUser.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();



router.route("/register").post(VerifyUser, upload.fields(
    [
        {
            name:'eventImage',
            maxCount:1,
        }
    ]
),registerEvent)

router.route("/approval-events").get(VerifyUser,getApprovalEvent)
router.route('/approved/:id').get(VerifyUser,getEventApproved)
router.route('/rejected/:id').get(VerifyUser,getEventRejected)
router.route("/all-events").get(getEvent)
router.route("/ongoing-events").get(VerifyUser,getOngoingEvent)
router.route("/recieved-certificate").get(VerifyUser,getRecievedCertificate)
router.route("/upcoming-events").get(VerifyUser,getUpcomingEvent)
router.route("/past-events").get(VerifyUser,getPastEvent)
router.route("/created-events").get(VerifyUser,getCreatedEvents)
router.route("/history-events").get(VerifyUser,getEventHistory)
router.route("/joined-users/:id").get(VerifyUser,getJoinedUsers)

export  default router