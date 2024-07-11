import { Router } from "express";
import { getUser, loginUser, newAcessToken, registerUser } from "../Controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import VerifyUser from "../middlewares/VerifyUser.js";

const router= Router()



router.route('/signup').post(upload.none(),registerUser)
router.route('/login').post(upload.none(),loginUser)

router.route("/getUser").get(VerifyUser,getUser)
router.route("/token").get(newAcessToken)

export default router






// router.route("/google/signup").get(passport.authenticate("google-signup",{
//     scope:["profile"]
// }))
// router.route("/google/signup/callback").get(passport.authenticate("google-signup"),(req,res)=>{
//     res.redirect("http://localhost:5173/signin")

// })


// router.route("/google/signin").get(passport.authenticate("google-signin",{
//     scope:["profile"]
// }))

// router.route("/google/signin/callback").get(passport.authenticate("google-signin" ,
//     {failureRedirect:"http://localhost:5173/signup"})
//     ,(req,res)=>{
//     res.redirect("http://localhost:5173/dashboard")
// })