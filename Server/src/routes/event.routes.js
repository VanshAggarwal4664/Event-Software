import { Router } from "express";
import { getApprovalEvent, getCreatedEvents, getEvent, getEventApproved, getEventHistory, getEventRejected, getJoinedUsers, getOngoingEvent, getPastEvent, getRecievedCertificate, getSingleEvent, getUpcomingEvent, registerEvent } from "../Controllers/event.controller.js";
import VerifyUser from "../middlewares/VerifyUser.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();


// route for creating a new event
router.route("/register").post(VerifyUser, upload.fields(
    [
        {
            name:'eventImage',
            maxCount:1,
        }
    ]
),registerEvent)

// route for fetching all the events which are pending
router.route("/approval-events").get(VerifyUser,getApprovalEvent)

//route for approval of a particular event
router.route('/approved/:id').get(VerifyUser,getEventApproved)

//route for rejection of a particular event
router.route('/rejected/:id').get(VerifyUser,getEventRejected)

//route for fetching all events
router.route("/all-events").get(getEvent)

// route for fetching all the joined ongoing event for a logged in user
router.route("/ongoing-events").get(VerifyUser,getOngoingEvent)


router.route("/recieved-certificate").get(VerifyUser,getRecievedCertificate)

// route for fetching all the joined upcoming events for a logged in user
router.route("/upcoming-events").get(VerifyUser,getUpcomingEvent)

// route for fetching all the joined both ongoing events and upcoming for a logged in user
router.route("/past-events").get(VerifyUser,getPastEvent)

// route for fetching all the created events for the logged in user
router.route("/created-events").get(VerifyUser,getCreatedEvents)

// route for fetching the event history
router.route("/history-events").get(VerifyUser,getEventHistory)

// route for fetching all the joined users for the particular event
router.route("/joined-users/:id").get(VerifyUser,getJoinedUsers)

// route for fetching a particular event
router.route("/getsingle-event/:id").get(VerifyUser,getSingleEvent)

export  default router