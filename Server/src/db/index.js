import mongoose from 'mongoose'
import { DB_Name } from '../constant.js'


const connectDB= async()=>{
  // connecting database 
  try {
     const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_Name}`)
     console.log("DB Connected Successfully",connectionInstance.connection.host)
  } catch (error) {
    console.log("MongoDb Connection error:",error)
  }
}


export default connectDB