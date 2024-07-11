import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
    hostName: {
        type: String,
        required: true,
        trim: true
    },
    eventName: {
        type: String,
        required: true,
        trim: true
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    eventImage:{
        type:String
    },
    eventType: {
        type: Boolean,
        required: true,
    },
    certified: {
        type: Boolean,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    longDescription: {
        type: String,
        required: true,
        trim: true
    },
    limit: {
        type: Number,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['Approved', 'Pending', 'Rejected'],
        default: "Pending"
    },
    
    certificate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Certificate"
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    eventChatGroup: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
    },

    joinedUsers:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]

})


const Event = mongoose.model("Event", EventSchema)

export default Event