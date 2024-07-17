import dotenv from 'dotenv';
dotenv.config()
import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'

          
// cloudinary configuration for uploading files
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadonCloudinary= async (localFilepath)=>{
    try {
        if(!localFilepath) return null;
        //upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilepath,{resource_type:"auto" })

        fs.unlinkSync(localFilepath)
        
        return response
    } catch (error) {
        console.log(error)
        fs.unlinkSync(localFilepath);
        return null
    }

}
const deleteImageCloudinary= async(publicId)=>{
try {
        if(!publicId) return false
        const response= await cloudinary.uploader.destroy(publicId)
        return true
} catch (error) {
    console.log("while deleting image on cloudinary",error)
    return false
}
}
export {uploadonCloudinary,deleteImageCloudinary};