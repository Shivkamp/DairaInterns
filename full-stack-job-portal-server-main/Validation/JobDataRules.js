const { check } = require("express-validator");
const { JOB_TYPE, JOB_STATUS } = require("../Utils/JobConstants");

exports.checkJobInput = [
    check("company").trim().notEmpty().withMessage("Faculty must have a name"),
    check("position").trim().notEmpty().withMessage("Project must have a name"),
    check("jobLocation")
        .trim()
        .notEmpty()
        .withMessage("Project school is required"),
    check("jobStatus")
        .isIn(Object.values(JOB_STATUS))
        .withMessage("Invalid Project status"),
    check("jobType")
        .isIn(Object.values(JOB_TYPE))
        .withMessage("Invalid Project type"),
    check("jobVacancy")
        .trim()
        .notEmpty()
        .withMessage("Project Vacancy is required"),
    check("jobSalary").trim().notEmpty().withMessage("Project Salary is required"),
    check("jobDeadline")
        .trim()
        .notEmpty()
        .withMessage("Project Deadline is required"),
    check("jobDescription")
        .trim()
        .notEmpty()
        .withMessage("Project Description is required"),
    // check("jobSkills")
    //     .optional({ checkFalsy: true }) // Making jobSkills optional
    //     .isArray({ min: 1 })
    //     .withMessage("Job Skills must be an array with at least one skill"),

    // check("jobFacilities")
    //     .optional({ checkFalsy: true }) // Making jobFacilities optional
    //     .isArray({ min: 1 })
    //     .withMessage("Job Facilities must be an array with at least one facility"),

    check("jobSkillz")
        .trim()
        .notEmpty()
        .withMessage("Project Skillz is required"),
    check("jobPerks")
        .trim()
        .notEmpty()
        .withMessage("Project Perks is required"),
    check("jobContact")
        .trim()
        .notEmpty()
        .withMessage("Job contact is required"),
];
