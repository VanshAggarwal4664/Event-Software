import dotenv from 'dotenv';
dotenv.config()
import connectDB from "./db/index.js";
import { server } from './app.js';
connectDB().then(()=>{
    server.listen( process.env.PORT || 8000,()=>{
        console.log(`server is running at port: ${process.env.PORT}`)
       })
}).catch((err)=>{
    console.log('mongodb connection  failed !!',err)
});

