import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import imagekit from "../utils/imagekit.js";

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            });
        }
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "You can't register same company.",
                success: false
            })
        };
        company = await Company.create({
            name: companyName,
            userId: req.id
        });

        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
        })
    } catch (error) {
        console.error('Register company error:', error);
        return res.status(500).json({
            message: "Internal server error during company registration",
            success: false
        });
    }
}

export const getCompany = async (req, res) => {
    try {
        const userId = req.id; // logged in user id
        const companies = await Company.find({ userId });
        if (!companies) {
            return res.status(404).json({
                message: "Companies not found.",
                success: false
            })
        }
        return res.status(200).json({
            companies,
            success:true
        })
    } catch (error) {
        console.error('Get company error:', error);
        return res.status(500).json({
            message: "Internal server error while fetching companies",
            success: false
        });
    }
}

// get company by id
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.error('Get company by ID error:', error);
        return res.status(500).json({
            message: "Internal server error while fetching company",
            success: false
        });
    }
}

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;

        const file = req.file;
        let logo;

        // Only upload file if a new logo is provided
        if (file) {
            const fileUri = getDataUri(file);
            const imagekitResponse = await imagekit.upload({
                file: fileUri.content,
                fileName: file.originalname,
            });
            logo = imagekitResponse.url;
        }

        // Create updateData object with only provided fields
        const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (description !== undefined) updateData.description = description;
        if (website !== undefined) updateData.website = website;
        if (location !== undefined) updateData.location = location;
        if (logo !== undefined) updateData.logo = logo;

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            message:"Company information updated.",
            success:true
        })

    } catch (error) {
        console.error('Update company error:', error);
        return res.status(500).json({
            message: "Internal server error during company update",
            success: false
        });
    }
}
