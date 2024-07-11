import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    content:{
        type:String,
        trim:true
    },
    attachments:[
        {
            public_id: {
                type: String,
              },
              url: {
                type: String,
              
              },
              format:{
                type: String,
              }
        }
    ],
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chat"
    }
},{ timestamps:true})


const Message= mongoose.model("Message",messageSchema)

export default Message