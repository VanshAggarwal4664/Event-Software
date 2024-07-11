import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import User from '../models/user.model.js'


passport.serializeUser((user,done)=>{
    done(null,user._id);
})

passport.deserializeUser(async(id,done)=>{
   console.log(id)
    const user= await User.findById(id)

   if(user){
    console.log("ma run hua")
    done(null,user)
   }else{
    console.log("wrong happens")
   }
})


passport.use("google-signin",
    new GoogleStrategy({
       clientID:"45070291384-7vugqegi2j1817oooaa48cubtv6c033q.apps.googleusercontent.com",
       clientSecret:"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",
       callbackURL:'/api/auth/google/signin/callback'
   },async(accessToken,refreshToken,profile,done)=>{
       console.log("yaha aa gya ma huhu")
       console.log(profile)
       try {
           const existedUser= await User.findOne({googleId:profile.id})
           if(existedUser){
             console.log("user already exist")
             done(null,existedUser)
           }else{
             console.log("yaha aa gya hu ma")
             done(false)
           }
       } catch (error) {
           console.log(error)
       }
   }
)
)