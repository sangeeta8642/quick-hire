import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { singleUpload } from "../middlewares/multer.js"
import {
    getCompany,
    updateCompany,
    deleteCompany,
    getCompanyById,
    registerCompany,
} from "../controllers/company.controller.js"

const router = express.Router()

router.route("/get").get(isAuthenticated, getCompany)
router.route("/get/:id").get(isAuthenticated, getCompanyById)
router.route("/register").post(isAuthenticated, registerCompany)
router.route("/update/:id").put(isAuthenticated, singleUpload, updateCompany)
router.route("/delete/:id").delete(isAuthenticated, deleteCompany)

export default router;