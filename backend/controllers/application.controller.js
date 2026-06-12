import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        // Block recruiters from applying to jobs
        if (req.role === 'recruiter') {
            return res.status(403).json({
                message: "Recruiters cannot apply to jobs.",
                success: false
            });
        }

        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required.",
                success: false
            })
        };
        // check if the user has already applied for the job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this jobs",
                success: false
            });
        }

        // check if the jobs exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }
        // create a new application
        const newApplication = await Application.create({
            job:jobId,
            applicant:userId,
        });

        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message:"Job applied successfully.",
            success:true
        })
    } catch (error) {
        console.error('Apply job error:', error);
        return res.status(500).json({
            message: "Internal server error while applying for job",
            success: false
        });
    }
};
export const getAppliedJobs = async (req,res) => {
    try {
        const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
        });
        if(!application){
            return res.status(404).json({
                message:"No Applications",
                success:false
            })
        };
        return res.status(200).json({
            application,
            success:true
        })
    } catch (error) {
        console.error('Get applied jobs error:', error);
        return res.status(500).json({
            message: "Internal server error while fetching applied jobs",
            success: false
        });
    }
}
// admin dekhega kitna user ne apply kiya hai
export const getApplicants = async (req,res) => {
    try {
        const jobId = req.params.id;

        // First verify job exists
        const job = await Job.findById(jobId).select('_id title applications');
        if(!job){
            return res.status(404).json({
                message:'Job not found.',
                success:false
            })
        };

        // Fetch applications with applicant populated (include role for filtering)
        const applications = await Application.find({ job: jobId })
            .sort({ createdAt: -1 })
            .populate({
                path: 'applicant',
                model: 'User',
                select: 'fullname email phoneNumber profile role createdAt'
            });

        // Separate valid student applications from invalid ones
        const validApplications = [];
        const invalidIds = [];

        for (const app of applications) {
            if (!app.applicant) {
                // Applicant user was deleted — mark for cleanup
                invalidIds.push(app._id);
            } else if (app.applicant.role === 'recruiter') {
                // Recruiter accidentally applied — remove this entry
                invalidIds.push(app._id);
            } else {
                validApplications.push(app);
            }
        }

        // Clean up invalid applications from DB and remove from job's array
        if (invalidIds.length > 0) {
            await Application.deleteMany({ _id: { $in: invalidIds } });
            await Job.findByIdAndUpdate(jobId, {
                $pull: { applications: { $in: invalidIds } }
            });
        }

        return res.status(200).json({
            job: { ...job.toObject(), applications: validApplications },
            success: true
        });
    } catch (error) {
        console.error('Get applicants error:', error);
        return res.status(500).json({
            message: "Internal server error while fetching applicants",
            success: false
        });
    }
}
export const updateStatus = async (req,res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message:'status is required',
                success:false
            })
        };

        // find the application by applicantion id
        const application = await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                message:"Application not found.",
                success:false
            })
        };

        // update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message:"Status updated successfully.",
            success:true
        });

    } catch (error) {
        console.error('Update status error:', error);
        return res.status(500).json({
            message: "Internal server error while updating status",
            success: false
        });
    }
}