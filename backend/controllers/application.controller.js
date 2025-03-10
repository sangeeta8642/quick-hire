import { Application } from "../models/Application.model.js"
import { Job } from "../models/Job.model.js"

export const applyJob = async (req, res) => {
    try {
        const userId = req.id
        const { id: jobId } = req.params
        if (!jobId) {
            return res.status(400).json({
                message: "Job id is requires",
                success: false
            })
        }

        //check is user already applied for this job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId })
        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            })
        }

        //check if the job exists
        const job = await Job.findById(jobId)
        if (!job) {
            return res.status(404).json({
                massage: "job not found",
                success: false
            })
        }

        //create new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        })


        job.applications.push(newApplication._id)
        await job.save()
        return res.status(201).json({
            job,
            message: "job applied successfully",
            success: true
        })
    } catch (error) {
        return res.status(500).json({ error: error.message, success: false })
    }
}

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id
        const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: "job",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "company",
                options: { sort: { createdAt: -1 } },
            }
        })

        if (!application) {
            return res.status(404).json({
                message: "No applications found",
                success: false
            })
        }

        return res.status(200).json({
            application,
            success: true
        })
    } catch (error) {
        return res.status(500).json({ error: error.message, success: false })
    }
}


export const getApplicants = async (req, res) => {
    try {
        const { id: jobId } = req.params
        const job = await Job.findById(jobId).populate({
            path: "applications",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "applicant"
            }
        })

        if (!job) {
            return res.status(404).json({
                message: "Job not foung",
                success: false
            })
        }

        return res.status(200).json({
            job,
            success: true
        })
    } catch (error) {
        return res.status(500).json({ error: error.message, success: false })
    }
}

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body
        const applicationId = req.params.id
        if (!status) {
            return res.status(400).json({
                message: "status is required",
                success: false
            })
        }

        const application = await Application.findOne({ _id: applicationId })
        if (!application) {
            return res.status(404).json({
                message: "Application not found.",
                success: false
            })
        }

        application.status = status.toLowerCase()
        await application.save()

        return res.status(200).json({
            message: "status updated.",
            success: true
        })
    } catch (error) {
        return res.status(500).json({ error: error.message, success: false })
    }
}   