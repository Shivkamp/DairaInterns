const mongoose = require("mongoose");
const { JOB_STATUS, JOB_TYPE } = require("../Utils/JobConstants");

// const ApplicationModel = require("../Model/ApplicationModel");

const JobSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            requried: [true, "Project must have a Faculty In Charge"],
            trim: true,
            // minLength: [5, "Project name is too short"],
            // maxLength: [100, "Project name is too long"],
        },
        position: {
            type: String,
            requried: [true, "A Project name is requried"],
            trim: true,
            // minLength: [5, "Project name is too short"],
            // maxLength: [200, "Project name is too long"],
        },
        jobStatus: {
            type: String,
            enum: Object.values(JOB_STATUS),
            default: JOB_STATUS.PENDING,
        },
        jobType: {
            type: String,
            enum: Object.values(JOB_TYPE),
            default: JOB_TYPE.PENDING
        },
        jobLocation: {
            type: String,
            required: [true, "Project must have a School"],
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        jobVacancy: {
            type: String,
            requried: [true, "Project Vacancy is requried"],
            trim: true,
            // minLength: [5, "Company name is too short"],
            // maxLength: [100, "Company name is too long"],
        },
        jobSalary: {
            type: String,
            requried: [true, "Project Domain is requried"],
            trim: true,
            // minLength: [5, "Company name is too short"],
            // maxLength: [100, "Company name is too long"],
        },
        jobDeadline: {
            type: String,
            requried: [true, "Project Deadline is requried"],
            trim: true,
            // minLength: [5, "Company name is too short"],
            // maxLength: [100, "Company name is too long"],
        },
        jobDescription: {
            type: String,
            requried: [true, "Project Description is requried"],
            trim: true,
            // minLength: [5, "Company name is too short"],
            // maxLength: [100, "Company name is too long"],
        },
        jobSkills: {
            type: [],
            default: null,
            trim: true,
            // minLength: [5, "Company name is too short"],
            // maxLength: [100, "Company name is too long"],
        },
        jobFacilities: {
            type: [],
            default: null,
            trim: true,
            // minLength: [5, "Company name is too short"],
            // maxLength: [100, "Company name is too long"],
        },
        jobTextField: {
            type: String,
            requried: [true, "Project Skills is requried"],
            trim: true,
            // minLength: [5, "Company name is too short"],
            // maxLength: [100, "Company name is too long"],
        },
        jobSkillz: {
            type: String,
            requried: [true, "Project Skills is requried"],
            trim: true,
            // minLength: [5, "Company name is too short"],
            // maxLength: [100, "Company name is too long"],
        },
        jobPerks: {
            type: String,
            requried: [true, "Project level is requried"],
            trim: true,
            // minLength: [5, "Company name is too short"],
            // maxLength: [100, "Company name is too long"],
        },
        jobContact: {
            type: String,
            requried: [true, "Project contact is requried"],
            trim: true,
            // minLength: [5, "Company name is too short"],
            // maxLength: [100, "Company name is too long"],
        },
    },
    { timestamps: true } // to keep track
);

// JobSchema.pre("remove", async function (next) {
//     try {
//         // 'this' refers to the job being removed
//         await ApplicationModel.deleteMany({ jobId: this._id });
//         next();
//     } catch (error) {
//         next(error);
//     }
// });

const JobModel = mongoose.model("Job", JobSchema);
module.exports = JobModel;
