import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Certificate from '../models/certificate.model.js'
import { uploadonCloudinary } from "../utils/Cloudinary.js";
import Event from "../models/event.model.js";
import User from "../models/user.model.js";

const createCertificate= asyncHandler(async(req,res)=>{
    const {companyName,event}=req.body
   if(!companyName){
    throw new ApiError(400,"Please Enter Company name")
   }
   if(!event){
    throw new ApiError(400,"Event Id is not there")
   }

   const logoPath= req?.files?.companyLogo[0]?.path;

   if(!logoPath){
    throw new ApiError(400,"Please Give Logo")
   }

   const isChecked=await Certificate.findOne({event}).populate('event')

   if(isChecked){
    return res.status(200).json(new ApiResponse(200,isChecked,"Certificate already Exist"))
   }

   const response= await  uploadonCloudinary(logoPath);

   if(!response){
    throw new ApiError(500,"error occured while uploading image")
   }

   const certificate= await Certificate.create({
    companyName,
    companyLogo:response?.url,
    event
   })

   if(!certificate){
    throw new ApiError("500","Error occured while saving data in Db")
   }
   const certificatData= await Certificate.findById(certificate?._id).populate("event");
    await Event.findByIdAndUpdate(event,{
        certificate:certificatData?._id
    })
    await User.findByIdAndUpdate(req.user._id,{
        $addToSet:{createdCertificates:certificatData?._id }
    },{
        new:true, 
        runValidators:true
    })

   return res.status(200).json(new ApiResponse(200, certificatData  ,"Certificate Created Successfully"))
})


const getCertificate=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const data= await Certificate.findOne({event:id}).populate("event");

    if(!data){
        throw new ApiError(404,"no certificate");
    }
    // if(data?.event.createdBy.equals(req.user._id)){
    //     return res.status(200).json(new ApiResponse(200,data,"certificate data by host of that event"))
    // }
      const response= await User.findOne({
        _id:req.user._id,
        // $and:[
        //     {
        //       recievedCertificates:{$elemMatch:{$eq:data._id}}
        //     }
        // ]
      })

      if(!response){
        throw new ApiError(200,"User dont have certificate for this event")
      }

      return res.status(200).json( new ApiResponse(200,{certificate:data,user:response},"Certificate for the joined user"))
})


const sendCertificate= asyncHandler(async(req,res)=>{
    let response
    const selectedUsers= req.body
    const {id}=req.params
     const certificate= Certificate.findOne({event:id});

     selectedUsers.map(async(user)=>{
        if(user.selected){
            response= await User.findByIdAndUpdate(user.id, {
                $addToSet: { recievedCertificates: certificate._id },
              })
        }
     })

     return res.status(200).json(new ApiResponse(200,{},"Successfully send Certificate to all Users"))
})


export {createCertificate,getCertificate,sendCertificate};