/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import styled from "styled-components";
import { CiSquarePlus } from "react-icons/ci";

import { Job_Status, Job_Type, Project_Domain } from "../utils/JobData";

import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// import { DayPicker } from "react-day-picker";
// import { format } from "date-fns";
// import "react-day-picker/dist/style.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { TagsInput } from "react-tag-input-component";

const AddJob = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [deadline, setDeadline] = useState(new Date());
    const [skills, setSkills] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const [companyValue, setCompanyValue] = useState(""); // State to hold company value

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setIsLoading(true);
        const newJob = {
            company: data?.company,
            position: data?.position,
            jobStatus: data?.status,
            jobType: data?.type,
            jobLocation: data?.location,
            jobVacancy: data?.vacancy,
            jobSalary: data?.salary,
            jobDeadline: data?.deadline,
            jobDescription: data?.description,
            jobSkills: skills,
            jobFacilities: facilities,
            jobContact: data?.contact,
            jobTextField: data?.textfield,
            jobSkillz: data?.skillz,
            jobPerks: data?.perks,
        };

        console.log(newJob)
        // posting;
        try {
            const response = await axios.post(
                "http://localhost:3000/api/v1/jobs",
                newJob,
                {
                    withCredentials: true,
                }
            );
            Swal.fire({
                icon: "success",
                title: "Done...",
                text: response?.data?.message,
            });

            reset();
            setDeadline(new Date());
            // setSkills([]);
            // setFacilities([]);
            // navigate("/");
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error?.response?.data,
            });
        }
        setIsLoading(false);
    };
    const handleCompanyBlur = (e) => {
        // Update companyValue state and also update skills and facilities states
        const value = e.target.value;
        setCompanyValue(value);
        setSkills([value]); // Autofill skills with company name
        setFacilities([value]); // Autofill facilities with company name
    };

    return (
        <Wrapper>
            <div className="">
                <div className="title-row">
                    Create Project
                    <CiSquarePlus className="ml-1 text-xl md:text-2xl" />
                </div>
                <div className="content-row">
                    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form">
                            {/* Position */}
                            <div className="row">
                                <label htmlFor="position">Project Name</label>
                                <input
                                    type="text"
                                    id="position"
                                    name="position"
                                    placeholder="Project"
                                    {...register("position", {
                                        required: {
                                            value: true,
                                            message: "Project Name is required",
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: "Too long (max 100char)",
                                        },
                                        minLength: {
                                            value: 3,
                                            message: "Too short (max 3char)",
                                        },
                                    })}
                                />
                                
                                {errors?.position && (
                                    <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                        {errors?.position?.message}
                                    </span>
                                )}
                            </div>

                            {/* Company */}
                            <div className="row">
                                <label htmlFor="company">Faculty Name</label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    placeholder="Faculty Name"
                                    {...register("company", {
                                        required: {
                                            value: true,
                                            message: "Faculty Name is required",
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: "Too long (max 100char)",
                                        },
                                        minLength: {
                                            value: 3,
                                            message: "Too short (max 3char)",
                                        },
                                    })}
                                    onBlur={handleCompanyBlur} // Call handleCompanyBlur on blur
                                />
                                {errors?.company && (
                                    <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                        {errors?.company?.message}
                                    </span>
                                )}
                            </div>

                            {/* Location */}
                            <div className="row">
                                <label htmlFor="location">School/Department</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    placeholder="Enter your School/Department"
                                    {...register("location", {
                                        required: {
                                            value: true,
                                            message: "School/Department is required",
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: "Too long (max 100char)",
                                        },
                                        minLength: {
                                            value: 3,
                                            message: "Too short (max 3char)",
                                        },
                                    })}
                                />
                                {errors?.location && (
                                    <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                        {errors?.location?.message}
                                    </span>
                                )}
                            </div>

                            {/* Status */}
                            <div className="row">
                                <label htmlFor="status">Project Status</label>
                                <select
                                    defaultValue={Job_Status.length > 0 ? Job_Status[0] : "none"}
                                    name="status"
                                    id="stauts"
                                    {...register("status", {
                                        required: {
                                            value: true,
                                            message: "Project Status is required",
                                        },
                                        validate: {
                                            valueType: (value) => {
                                                return (
                                                    value !== "none" ||
                                                    "Project Status is required"
                                                );
                                            },
                                        },
                                    })}
                                >
                                    <option disabled value="none">
                                        Select a Project Status
                                    </option>

                                    {Job_Status?.map((job, index) => (
                                        <option value={job} key={index + job}>
                                            {job}
                                        </option>
                                    ))}
                                </select>
                                {errors?.status && (
                                    <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                        {errors?.status?.message}
                                    </span>
                                )}
                            </div>

                            {/*Type*/}
                            <div className="row">
                                <label htmlFor="type">Career Choice</label>
                                <select
                                    defaultValue={"none"}
                                    name="type"
                                    id="type"
                                    {...register("type", {
                                        required: {
                                            value: true,
                                            message: "Career Choice is required",
                                        },
                                        validate: {
                                            valueType: (value) => {
                                                return (
                                                    value !== "none" ||
                                                    "Career Choice is required"
                                                );
                                            },
                                        },
                                    })}
                                >
                                    <option disabled value="none">
                                        Select a Career Choice
                                    </option>
                                    {Job_Type?.map((job, index) => (
                                        <option value={job} key={index + job}>
                                            {job}
                                        </option>
                                    ))}
                                </select>
                                {errors?.type && (
                                    <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                        {errors?.type?.message}
                                    </span>
                                )}
                            </div>

                            {/* Vacancy */}
                            <div className="row">
                                <label htmlFor="vacancy">Students Required</label>
                                <input
                                    type="number"
                                    id="vacancy"
                                    name="vacancy"
                                    placeholder="Availability"
                                    {...register("vacancy", {
                                        required: {
                                            value: true,
                                            message: "Students required must be filled",
                                        },
                                        max: {
                                            value: 1000,
                                            message:
                                                "Check Students Required(too much)",
                                        },
                                        min: {
                                            value: 1,
                                            message:
                                                "Students Required can't 0 or smaller",
                                        },
                                    })}
                                />
                                {errors?.vacancy && (
                                    <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                        {errors?.vacancy?.message}
                                    </span>
                                )}
                            </div>

                            {/*domain*/}
                            <div className="row">
                                <label htmlFor="salary">Project Domain</label>
                                <select
                                    defaultValue={"none"}
                                    name="salary"
                                    id="salary"
                                    {...register("salary", {
                                        required: {
                                            value: true,
                                            message: "Project Domain is required",
                                        },
                                        validate: {
                                            valueType: (value) => {
                                                return (
                                                    value !== "none" ||
                                                    "Project Domain is required"
                                                );
                                            },
                                        },
                                    })}
                                >
                                    <option disabled value="none">
                                        Select an Input
                                    </option>
                                    {Project_Domain?.map((job, index) => (
                                        <option value={job} key={index + job}>
                                            {job}
                                        </option>
                                    ))}
                                </select>
                                {errors?.type && (
                                    <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                        {errors?.type?.message}
                                    </span>
                                )}
                            </div>

                            {/* Deadline */}
                            <div className="row">
                                <label htmlFor="deadline">Project Tenure</label>
                                <input
                                    type="number"
                                    id="deadline"
                                    name="deadline"
                                    placeholder="Timelime (in Months)"
                                    {...register("deadline", {
                                        required: {
                                            value: true,
                                            message: "Project Tenure is required",
                                        },
                                        max: {
                                            value: 50,
                                            message:
                                                "Check Project Tenure(too much)",
                                        },
                                        min: {
                                            value: 1,
                                            message:
                                                "Project Tenure can't 0 or smaller",
                                        },
                                    })}
                                />
                                {errors?.deadline && (
                                    <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                        {errors?.deadline?.message}
                                    </span>
                                )}
                            </div>

                            {/* Contact */}
                            <div className="row">
                                <label htmlFor="contact">Contact Mail</label>
                                <input
                                    type="text"
                                    id="contact"
                                    name="contact"
                                    placeholder="Project Contact"
                                    {...register("contact", {
                                        required: {
                                            value: true,
                                            message: "Project Contact is required",
                                        },
                                    })}
                                />
                                {errors?.contact && (
                                    <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                        {errors?.contact?.message}
                                    </span>
                                )}
                            </div>

                            
                            <div className="row">
                                <label htmlFor="textfield">Form Link</label>
                                <input
                                    type="text"
                                    id="textfield"
                                    name="textfield"
                                    placeholder="Form Link"
                                    {...register("textfield", {
                                        required: {
                                            value: false,
                                        },
                                        maxLength: {
                                            value: 1000,
                                            message: "Too long (max 100char)",
                                        },
                                        minLength: {
                                            value: 3,
                                            message: "Too short (max 3char)",
                                        },
                                    })}
                                />
                                {errors?.textfield && (
                                    <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                        {errors?.textfield?.message}
                                    </span>
                                )}
                            </div>

                            <div className="row">
                                <label htmlFor="skillz">Skills</label>
                                <input
                                    type="text"
                                    id="skillz"
                                    name="skillz"
                                    placeholder="Use commas as a seperator for multiple skills"
                                    {...register("skillz", {
                                        required: {
                                            value: true,
                                            message: "Skills are required",
                                        },
                                        maxLength: {
                                            value: 1000,
                                            message: "Too long (max 100char)",
                                        },
                                        minLength: {
                                            value: 3,
                                            message: "Too short (max 3char)",
                                        },
                                    })}
                                />
                                {errors?.skillz && (
                                    <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                        {errors?.skillz?.message}
                                    </span>
                                )}
                            </div>

                            <div className="row">
                                <label htmlFor="perks">Perks</label>
                                <input
                                    type="text"
                                    id="perks"
                                    name="perks"
                                    placeholder="Use commas as a seperator for multiple perks"
                                    {...register("perks", {
                                        required: {
                                            value: true,
                                            message: "Perks are required",
                                        },
                                        maxLength: {
                                            value: 1000,
                                            message: "Too long (max 100char)",
                                        },
                                        minLength: {
                                            value: 3,
                                            message: "Too short (max 3char)",
                                        },
                                    })}
                                />
                                {errors?.perks && (
                                    <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                        {errors?.perks?.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Tag inputs */}
                        <div className = "hidden">
                            <div className="row gap-y-2">
                                <label htmlFor="position">
                                    Skills Expected from the Students
                                </label>
                                <TagsInput
                                    value={skills} // Hardcoded values instead of {skills}
                                    onChange={setSkills}
                                    name="skills"
                                    placeHolder="HTML, CSS"
                                    separators={["Enter", ","]}
                                    onRemoved={["Backspace"]}
                                    classNames={{
                                        tag: "tag-cls",
                                        input: "input-cls",
                                    }}
                                />
                            </div>
                            <div className="row gap-y-2">
                                <label htmlFor="position">Perks</label>
                                <TagsInput
                                    value={facilities} // Hardcoded values instead of {facilities}
                                    onChange={setFacilities}
                                    name="facilities"
                                    placeHolder="Type here"
                                    separators={["Enter", ","]}
                                    onRemoved={["Backspace"]}
                                    classNames={{
                                        tag: "tag-cls",
                                        input: "input-cls",
                                    }}
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="row  mt-5">
                            <label htmlFor="description">Type of Project and its Description</label>
                            <textarea
                                type="text"
                                id="description"
                                name="description"
                                placeholder="Project Description and Type"
                                className="w-full max-w-none"
                                {...register("description", {
                                    required: {
                                        value: true,
                                        message: "Project description is required",
                                    },
                                    maxLength: {
                                        value: 2000,
                                        message: "Too long (max 2000char)",
                                    },
                                    minLength: {
                                        value: 10,
                                        message: "Too short (min 10char)",
                                    },
                                })}
                            />
                            {errors?.description && (
                                <span className="text-[10px] font-semibold text-red-600 mt-1 pl-1 tracking-wider">
                                    {errors?.description?.message}
                                </span>
                            )}
                        </div>

                        <div className="row mt-4 sm:mt-0">
                            <label htmlFor="" className="invisible">
                                delete
                            </label>
                            <input
                                type="submit"
                                value="submit"
                                className="btn"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.section`
    .hidden {
        display: none;
    }
    .title-row {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: calc(0.9rem + 0.4vw);
        text-transform: capitalize;
        letter-spacing: 1px;
        font-weight: 600;
        opacity: 0.85;
        color: var(--color-black);
        position: relative;
    }
    .title-row:before {
        content: "";
        position: absolute;
        bottom: -4px;
        left: 0;
        width: calc(30px + 0.7vw);
        height: calc(2px + 0.1vw);
        background-color: var(--color-primary);
    }
    .content-row {
        margin-top: calc(2rem + 0.5vw);
    }
    .form {
        margin-top: calc(30px + 1vw);
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        justify-content: space-between;
        align-items: center;
        grid-gap: calc(1rem + 0.5vw);
    }
    @media screen and (max-width: 1000px) {
        .form {
            grid-template-columns: repeat(2, 1fr);
        }
    }
    @media screen and (max-width: 600px) {
        .form {
            grid-template-columns: 1fr;
        }
    }
    .row {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    .row label {
        font-size: 11.3px;
        font-weight: 600;
        letter-spacing: 1px;
        color: var(--color-black);
        opacity: 0.95;
    }
    input,
    select,
    textarea {
        width: 100%;
        max-width: 500px;
        padding: 8px 14px;
        margin-top: 6px;
        display: inline-block;
        border: 1px solid #0000004a;
        border-radius: 4px;
        box-sizing: border-box;
        font-size: calc(0.8rem + 0.1vw);
        outline: none;
        color: var(--color-black);
    }
    textarea {
        max-width: none;
        min-height: 100px;
    }
    select {
        padding-left: 2px;
        text-transform: capitalize;
    }
    input:focus,
    select:focus,
    textarea:focus {
        outline: none;
        border: 1px solid #00000086;
    }
    .input-cls {
        max-width: none;
        width: 100%;
        font-size: 13px;
        padding: 5px 10px;
    }
    .tag-cls {
        font-size: 14px;
    }
    /* .rti--container {
        border: 1px solid #00000086;
    } */
    .btn {
        width: 100%;
        max-width: 150px;
        height: 100%;
        display: inline-block;
        background-color: var(--color-black);
        color: var(--color-white);
        cursor: pointer;
        transition: all 0.3s linear;
        text-transform: capitalize;
        font-size: calc(0.9rem + 0.1vw);
    }
    .btn:hover {
        background-color: var(--color-primary);
    }
    @media screen and (max-width: 600px) {
        .btn {
            margin: 0 auto;
            margin-top: -6px;
        }
    }
`;
export default AddJob;
