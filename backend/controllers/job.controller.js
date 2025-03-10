import { Application } from "../models/Application.model.js"
import { Company } from "../models/Company.model.js"
import { Job } from '../models/Job.model.js'

export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body
        const userId = req.id
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res
                .status(400)
                .json({
                    message: "Please provide complete details.",
                    success: false
                })
        }
        let job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary,
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        })

        return res
            .status(201)
            .json({
                message: "job created successfully.",
                job,
                success: true
            })


    } catch (err) {
        return res.status(500).json({ error: err.message, success: false })

    }
}

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id
        const job = await Job.findById(jobId).populate({
            path: "applications"
        })
        if (!job) {
            return res
                .status(404)
                .json({
                    message: "No job found",
                    success: false
                })
        }
        return res.status(200).json({ job, success: true })
    } catch (error) {
        return res.status(500).json({ error: error.message, success: false })
    }
}

export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id
        const jobs = await Job.find({ created_by: adminId }).populate({
            path: "company"
        })
        if (!jobs) {
            return res
                .status(404)
                .json({
                    message: "No job found",
                    success: false
                })
        }
        return res.status(200).json({ jobs, success: true })
    } catch (error) {
        return res.status(500).json({ error: error.message, success: false })
    }
}

export const updateJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experienceLevel, position, company } = req.body;
        const userId = req.id; 
        if (!title || !description || !requirements || !salary || !location || !jobType || !experienceLevel || !position || !company) {
            return res
                .status(400)
                .json({
                    message: "Please provide complete details.",
                    success: false
                });
        }

        // Find the job by ID and update it with the new details
        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id, // Job ID from the route parameter
            {
                title,
                description,
                requirements, // Convert requirements string to array if needed
                salary,
                location,
                jobType,
                experienceLevel,
                position,
                company,
                created_by: userId
            },
            { new: true } // Return the updated document
        );

        // If the job is not found
        if (!updatedJob) {
            return res
                .status(404)
                .json({
                    message: "Job not found",
                    success: false
                });
        }

        // Success response
        return res
            .status(200)
            .json({
                message: "Job updated successfully.",
                job: updatedJob,
                success: true
            });

    } catch (err) {
        // Error handling
        return res.status(500).json({
            message: "An error occurred while updating the job.",
            error: err.message,
            success: false
        });
    }
};

export const deleteJob = async (req, res) => {
    try {
        // Find the job by ID and delete it
        const deleteJob = await Job.findByIdAndDelete(req.params.id);

        // If the job is not found
        if (!deleteJob) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        // Delete all applications associated with the job
        await Application.deleteMany({ job: req.params.id });

        // Fetch the remaining jobs
        const jobs = await Job.find();

        // Success response
        return res.status(200).json({
            message: "Job deleted successfully.",
            jobs,
            success: true
        });

    } catch (err) {
        // Error handling
        return res.status(500).json({
            message: "An error occurred while deleting the job.",
            error: err.message,
            success: false
        });
    }
};
