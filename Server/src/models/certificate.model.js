import mongoose from 'mongoose'

const certificateSchema= new mongoose.Schema({
    companyName:{
        type: String,
        required: true
    },
    companyLogo:{
      type:String
    },

    event:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Event"
    },

})

const Certificate= mongoose.model("Certificate",certificateSchema)

export default Certificate;