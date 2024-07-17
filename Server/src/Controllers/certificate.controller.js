import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Certificate from '../models/certificate.model.js'
import { uploadonCloudinary } from "../utils/Cloudinary.js";
import Event from "../models/event.model.js";
import User from "../models/user.model.js";

// this controller create a certificate which take three values eventinfo,logo and companyName

const createCertificate= asyncHandler(async(req,res)=>{
    const {companyName,event}=req.body

    // checking company name and event id is present on not
   if(!companyName){
    throw new ApiError(400,"Please Enter Company name")
   }
   if(!event){
    throw new ApiError(400,"Event Id is not there")
   }

   // checking logo path is present or not
   const logoPath= req?.files?.companyLogo[0]?.path;

   if(!logoPath){
    throw new ApiError(400,"Please Give Logo")
   }
    // checking certificate is already exist or not
   const isChecked=await Certificate.findOne({event}).populate('event')

   if(isChecked){
    return res.status(200).json(new ApiResponse(200,isChecked,"Certificate already Exist"))
   }
   // uploading file on the cloudinary
   const response= await  uploadonCloudinary(logoPath);

   if(!response){
    throw new ApiError(500,"error occured while uploading image")
   }
 // creating a new certificate for that event
   const certificate= await Certificate.create({
    companyName,
    companyLogo:response?.url,
    event
   })

   if(!certificate){
    throw new ApiError("500","Error occured while saving data in Db")
   }
   const certificatData= await Certificate.findById(certificate?._id).populate("event");
   // update event table with the certificate value
    await Event.findByIdAndUpdate(event,{
        certificate:certificatData?._id
    })

    // update user table with created certificates
    await User.findByIdAndUpdate(req.user._id,{
        $addToSet:{createdCertificates:certificatData?._id }
    },{
        new:true, 
        runValidators:true
    })

   return res.status(200).json(new ApiResponse(200, certificatData  ,"Certificate Created Successfully"))
})

// this controller get recieved certificate which take eventid to find the certificate
const getCertificate=asyncHandler(async(req,res)=>{
    const {id}=req.params
    // finding certificate for that event
    const data= await Certificate.findOne({event:id}).populate("event");
// if not present it show no certificate
    if(!data){
        throw new ApiError(404,"no certificate");
    }
    // if(data?.event.createdBy.equals(req.user._id)){
    //     return res.status(200).json(new ApiResponse(200,data,"certificate data by host of that event"))
    // }

    // finding certificate is present in recieved certificates or not
      const response= await User.findOne({
        _id:req.user._id,
        $and:[
            {
              recievedCertificates:{$elemMatch:{$eq:data._id}}
            }
        ]
      })


      return res.status(200).json( new ApiResponse(200,{certificate:data,user:response},"Certificate for the joined user"))
})

// this controller send certificate to all user who is
const sendCertificate= asyncHandler(async(req,res)=>{
    let response
    // taking selected users which are send by the frontend
    const selectedUsers= req.body
    // if selected users is not present it shows error
    if(selectedUsers.length==0){
        return res.status(200).json(new ApiResponse(200,null,"Please Select the Users"))
    }
    // get event id to find the particular certificate
    const {id}=req.params
     const certificate= await Certificate.findOne({event:id});

     // sending the certficcate to that user which is selected by event host
     try {
        await Promise.all( selectedUsers.map(async(user)=>{
            if(user.selected){
                 await User.findByIdAndUpdate(user.id, {
                    $addToSet: { recievedCertificates: certificate._id },
                  })
            }
         }))
         return res.status(200).json(new ApiResponse(200,{},"Successfully send Certificate to all Selected Users"))
     } catch (error) {
        throw new ApiError(200,"Error in sending Certificate")
     }

    

    
})


export {createCertificate,getCertificate,sendCertificate};