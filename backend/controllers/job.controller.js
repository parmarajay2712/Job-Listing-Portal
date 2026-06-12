import { Job } from "../models/job.model.js";

// admin post krega job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Somethin is missing.",
                success: false
            })
        };
        
        // Parse salary - handle string inputs like "50000" or "50,000"
        let parsedSalary = 0;
        if (typeof salary === 'string') {
            parsedSalary = parseFloat(salary.replace(/,/g, '')) || 0;
        } else {
            parsedSalary = Number(salary) || 0;
        }
        
        // Parse experience level - handle string inputs like "1-4 years" or "Fresher"
        let parsedExperience = 0;
        if (typeof experience === 'string') {
            // Extract the first number from the experience string
            const match = experience.match(/\d+/);
            parsedExperience = match ? parseInt(match[0]) : 0;
        } else {
            parsedExperience = Number(experience) || 0;
        }
        
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: parsedSalary,
            location,
            jobType,
            experienceLevel: parsedExperience,
            position: Number(position),
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.error('Post job error:', error);
        return res.status(500).json({
            message: "Internal server error while posting job",
            success: false
        });
    }
}
// student k liye
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const salaryMin = req.query.salaryMin ? Number(req.query.salaryMin) : null;
        const salaryMax = req.query.salaryMax ? Number(req.query.salaryMax) : null;

        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };

        // Add salary range filter if provided
        if (salaryMin !== null && salaryMax !== null) {
            query.salary = {
                $gte: salaryMin,
                $lte: salaryMax
            };
        }

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
        console.error('Get all jobs error:', error);
        return res.status(500).json({
            message: "Internal server error while fetching jobs",
            success: false
        });
    }
}
// student
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.error('Get job by ID error:', error);
        return res.status(500).json({
            message: "Internal server error while fetching job",
            success: false
        });
    }
}
// admin kitne job create kra hai abhi tk
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId })
            .populate({ path: 'company' })
            .populate({
                path: 'applications',
                populate: {
                    path: 'applicant',
                    model: 'User',
                    select: 'role'
                }
            })
            .sort({ createdAt: -1 });

        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };

        // For each job, filter out recruiter/null applicant entries from count
        const jobsWithCleanCounts = jobs.map(job => {
            const jobObj = job.toObject();
            jobObj.applications = (jobObj.applications || []).filter(app =>
                app.applicant && app.applicant.role === 'student'
            );
            return jobObj;
        });

        return res.status(200).json({
            jobs: jobsWithCleanCounts,
            success: true
        })
    } catch (error) {
        console.error('Get admin jobs error:', error);
        return res.status(500).json({
            message: "Internal server error while fetching admin jobs",
            success: false
        });
    }
}

// Update job
export const updateJob = async (req, res) => {
    try {
        const { jobId, title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            })
        };

        // Parse salary - handle string inputs like "50000" or "50,000"
        let parsedSalary = 0;
        if (typeof salary === 'string') {
            parsedSalary = parseFloat(salary.replace(/,/g, '')) || 0;
        } else {
            parsedSalary = Number(salary) || 0;
        }

        // Parse experience level - handle string inputs like "1-4 years" or "Fresher"
        let parsedExperience = 0;
        if (typeof experience === 'string') {
            const match = experience.match(/\d+/);
            parsedExperience = match ? parseInt(match[0]) : 0;
        } else {
            parsedExperience = Number(experience) || 0;
        }

        const job = await Job.findByIdAndUpdate(
            jobId,
            {
                title,
                description,
                requirements: requirements.split(","),
                salary: parsedSalary,
                location,
                jobType,
                experienceLevel: parsedExperience,
                position: Number(position),
                company: companyId
            },
            { new: true }
        ).populate({ path: "company" });

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            })
        };

        return res.status(200).json({
            message: "Job updated successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.error('Update job error:', error);
        return res.status(500).json({
            message: "Internal server error while updating job",
            success: false
        });
    }
}
