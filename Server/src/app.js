import dotenv from 'dotenv';
dotenv.config()
import express, { urlencoded } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import {Server} from "socket.io"
import { createServer } from 'http'
const app= express();


app.use(express.json({limit:"16kb"}));
app.use(urlencoded({extended:true, limit:"16kb"}));
app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET","POST"],
    credentials: true
}))
app.use(express.static("Public"));
app.use(cookieParser());

const server = createServer(app)
const io= new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"],
        credentials: true
    }
})




//Routes
import userRouter from './routes/user.routes.js'
import eventRouter from './routes/event.routes.js'
import chatRouter from './routes/chat.routes.js'
import messageRouter from './routes/message.route.js'
import certificateRouter from './routes/certificate.routes.js'
app.use('/api/v1/user',userRouter)


// event Routes
app.use('/api/v1/event',eventRouter)

// chat routes
app.use('/api/v1/chat',chatRouter)

// message routes

app.use('/api/v1/message',messageRouter)

// certificate routes
app.use('/api/v1/certificate',certificateRouter)


io.on("connection",(socket)=>{
    console.log("a new user connected",socket.id)

   socket.on("setup",(userData)=>{
      socket.join(userData._id)
      console.log(userData._id)
      socket.emit("connected")
   })


   socket.on("join room",(roomID)=>{
       socket.join(roomID)
       console.log("user joined room",roomID)
   })


   socket.on("new-message",(newMessage)=>{
    const chat= newMessage?.chat
    if(!chat.users) return console.log("users not found")

        chat?.users?.map((user)=>{
            if(user._id== newMessage?.sender?._id) return
            socket.in(user._id).emit("message-recieved",newMessage)
        })
       
   })
})








export {server} ;









// app.use(session({
//     secret:process.env.SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         maxAge: 1000 * 60 * 60 * 24 // 1 day
//     }
// }))

// app.use(passport.initialize())
// app.use(passport.session())

// import ('./utils/passport-signup.js')
// import ('./utils/passport-signin.js')