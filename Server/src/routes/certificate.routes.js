import { Router } from "express";
import VerifyUser from "../middlewares/VerifyUser.js";
import { createCertificate, getCertificate, sendCertificate } from "../Controllers/certificate.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router= Router()


router.route('/create-certificate').post(VerifyUser, upload.fields(
    [
        {
            name:'companyLogo',
            maxCount:1,
        }
    ]
), createCertificate);

router.route('/get-certificate/:id').get(VerifyUser,getCertificate);
router.route('/send-certificate/:id').post(VerifyUser,sendCertificate)
export default router