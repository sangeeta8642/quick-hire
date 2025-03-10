import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import {
    postJob,
    updateJob,
    deleteJob,
    getAllJobs,
    getJobById,
    getAdminJobs,
} from "../controllers/job.controller.js"

const router = express.Router()

router.route("/post").post(isAuthenticated, postJob)
router.route("/get").get(getAllJobs)
router.route("/get/:id").get(isAuthenticated, getJobById)
router.route("/update/:id").put(isAuthenticated, updateJob)
router.route("/delete/:id").delete(isAuthenticated, deleteJob)
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs)


export default router;