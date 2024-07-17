import { Router } from "express";
import VerifyUser from "../middlewares/VerifyUser.js";
import { createCertificate, getCertificate, sendCertificate } from "../Controllers/certificate.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router= Router()

// route for creating a new certificate
router.route('/create-certificate').post(VerifyUser, upload.fields(
    [
        {
            name:'companyLogo',
            maxCount:1,
        }
    ]
), createCertificate);

// route for getting a certificate for that particular event
router.route('/get-certificate/:id').get(VerifyUser,getCertificate);

// route for sending the certificate of particular event to selected users
router.route('/send-certificate/:id').post(VerifyUser,sendCertificate)
export default router