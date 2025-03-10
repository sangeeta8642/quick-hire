import express from "express"
import { singleUpload } from "../middlewares/multer.js"
import isAuthenticated from "../middlewares/isAuthenticated.js"

import {
    login,
    logout,
    register,
    updateProfile,
    updateProfilePhoto
} from "../controllers/user.controller.js"

const router = express.Router()

router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/register").post(singleUpload, register)
router.put("/profile/photo", isAuthenticated, singleUpload, updateProfilePhoto);
router.route("/profile/update").post(isAuthenticated, singleUpload, updateProfile)


export default router;