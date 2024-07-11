import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import User from '../models/user.model.js'


passport.serializeUser((user,done)=>{
    done(null,user._id);
})

// passport.deserializeUser(async(id,done)=>{
//     console.log(id)
//    const user= await User.findById(id)
//    if(user){
//     done(null,user)
//    }else{
//     console.log("wrong happens")
//    }
// })

passport.use("google-signup",
     new GoogleStrategy({
        clientID:"45070291384-7vugqegi2j1817oooaa48cubtv6c033q.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL:'/api/auth/google/signup/callback'
    },async(accessToken,refreshToken,profile,done)=>{
        console.log("yaha aa gya ma")
        console.log(profile)
        try {
            const existedUser= await User.findOne({googleId:profile.id})
            if(existedUser){
              console.log("user already exist")
              done(null,existedUser)
            }else{
                const newUser= await User.create({
                    googleId:profile.id,
                    name: profile.displayName
                })
    
                console.log("new user created",newUser)
                done(null,newUser)
            }
           
        } catch (error) {
            console.log(error)
        }
    }
)
)


