import { Company } from '../models/Company.model.js'
import { Job } from '../models/Job.model.js'
import cloudinary from '../utils/cloudinary.js'
import getDataUri from '../utils/datauri.js'

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body
        if (!companyName) {
            return res
                .status(400)
                .json({
                    message: "Please provide the company name.",
                    success: false
                })
        }

        let company = await Company.findOne({ name: companyName })
        if (company) {
            return res
                .status(400)
                .json({
                    message: "Company with this name has already exists.",
                    success: false
                })
        }
        company = await Company.create({
            name: companyName,
            userId: req.id
        })
        return res
            .status(201)
            .json({
                message: "Company registed successfully.",
                company,
                success: true
            })
    } catch (error) {
        return res.status(500).json({ error: error.message, success: false })
    }
}

export const getCompany = async (req, res) => {
    try {

        const userId = req.id
        let companies = await Company.find({ userId })
        if (!companies) {
            return res
                .status(404)
                .json({
                    message: "No companies found",
                    success: false
                })
        }
        return res
            .status(201)
            .json({
                companies,
                success: true
            })

    } catch (error) {
        return res.status(500).json({ error: error.message, success: false })
    }
}

export const getCompanyById = async (req, res) => {
    try {
        let companyId = req.params.id
        let company = await Company.findById(companyId)
        if (!company) {
            return res
                .status(404)
                .json({
                    message: "No company found",
                    success: false
                })
        }
        return res
            .status(201)
            .json({
                company,
                success: true
            })

    } catch (error) {
        return res.status(500).json({ error: error.message, success: false })
    }
}

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;

        // Fetch the current company from the database using the company ID
        const company = await Company.findById(req.params.id);

        if (!company) {
            return res.status(404).json({
                message: "No company found",
                success: false
            });
        }

        // Set the logo to either the existing logo or a new file if uploaded
        let logo = company.logo; // This holds the current logo from the database

        // If a new file is uploaded, upload it to Cloudinary and update the logo
        if (req.file) {
            const file = req.file;
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            logo = cloudResponse.secure_url; // New logo URL
        }

        // Prepare the update data
        const updateData = { name, description, website, location, logo };

        // Update the company in the database
        const updatedCompany = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        return res.status(200).json({
            message: "Company information updated",
            success: true,
            data: updatedCompany
        });
    } catch (error) {
        return res.status(500).json({ error: error.message, success: false });
    }
};

export const deleteCompany = async (req, res) => {
    try {
        // Find the job by ID and delete it
        const deleteCompany = await Company.findByIdAndDelete(req.params.id);

        // If the job is not found
        if (!deleteCompany) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }

        // Delete all applications associated with the job
        await Job.deleteMany({ company: req.params.id });

        // Fetch the remaining jobs
        const companies = await Company.find();

        // Success response
        return res.status(200).json({
            message: "Company deleted successfully.",
            companies,
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
