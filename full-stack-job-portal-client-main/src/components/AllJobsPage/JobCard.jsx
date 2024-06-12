import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { TfiLocationPin } from "react-icons/tfi";
import { BsFillBriefcaseFill, BsHourglass, BsHourglassSplit } from "react-icons/bs";
import { TbTargetArrow } from "react-icons/tb";
import { FaGraduationCap, FaRegCalendarAlt, FaSchool } from "react-icons/fa";

import advancedFormat from "dayjs/plugin/advancedFormat";
import dayjs from "dayjs";
dayjs.extend(advancedFormat);

import { useUserContext } from "../../context/UserContext";

import { Link } from "react-router-dom";
import { postHandler } from "../../utils/FetchHandlers";
import Swal from "sweetalert2";

const JobCard = ({ job }) => {
    // const date = dayjs(job?.jobDeadline).format("MMM Do, YYYY");
    const { user } = useUserContext();

    const handleApply = async (id) => {
        let currentDate = new Date();
        let date = currentDate.toISOString().slice(0, 10);
        const appliedJob = {
            applicantId: user?._id,
            recruiterId: job?.createdBy,
            jobId: id,
            status: "pending",
            dateOfApplication: date,
            email: user?.email || "",
            resume: user?.resume || "",
        };
        try {
            const response = await postHandler({
                url: "http://localhost:3000/api/v1/application/apply",
                body: appliedJob,
            });
            Swal.fire({
                icon: "success",
                title: "Hurray...",
                text: response?.data?.message,
            });
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error?.response?.data?.error[0].msg,
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error?.response?.data,
                });
            }
        }
    };
    return (
        <Wrapper>
            <SectionWrapper>
                <div className="card-container">
                    <div className="card-header">
                        <div className="right">
                            <JobTitle_header>
                                {job?.position}
                            </JobTitle_header>
                            <Company>
                                {job?.company}
                            </Company>
                        </div>
                    </div>
                    <div className="middle-row">
                        <Info>
                            <FaRegCalendarAlt className="mr-2 text-lg" />
                            Timeline: {job?.jobDeadline} Months
                        </Info>
                        <Info>
                            <FaSchool className="mr-2 text-lg" />
                            {job?.jobLocation}
                        </Info>
                        <Info>
                            <FaGraduationCap className="mr-2 text-lg" />
                            {job?.jobSalary}
                        </Info>
                        <div className="status capitalize">
                            <BsHourglassSplit className="mr-2 text-lg" />
                            <span className={job?.jobStatus}>{job?.jobStatus}</span>
                        </div>
                    </div>
                    <div className="end-row" style={{ paddingBottom: '40px' }} >
                        <Link to={`/job/${job._id}`} className="detail-btn">
                            details
                        </Link>
                        {user?.role === "user" && (
                            <button
                                className="apply-btn"
                                onClick={() => handleApply(job._id)}
                            >
                                Apply
                            </button>
                        )}
                        {user?._id === job?.createdBy && (
                            <Link
                                to={`/dashboard/edit-job/${job._id}`}
                                className="detail-btn"
                            >
                                edit
                            </Link>
                        )}
                    </div>
                </div>
            </SectionWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    /* max-width: 400px; */
    margin: 0 auto;
    .card-container {
        height: 100%;
        box-shadow: 0 4px 4px var(--shadow-medium),
            0 -2px 6px var(--shadow-medium);
        border-radius: 4px;
        padding: 2rem 1.5rem;
    }
    .card-container .card-header {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .card-container .logo {
        margin-right: 18px;
        width: 50px;
        height: 50px;
        border-radius: 3px;
        background-color: #359F71;
        display: flex;
        justify-content: center;
        align-items: center;
        /* optional */
        color: var(--color-white);
        font-size: 30px;
        font-weight: 700;
        text-transform: uppercase;
    }
    .right .title {
        text-transform: capitalize;
        font-size: calc(15px + 0.3vw);
        font-weight: 600;
        color: var(--color-black);
        line-height: 24px;
    }
    .right .company {
        display: inline-block;
        text-transform: capitalize;
        font-size: calc(11px + 0.15vw);
        font-weight: 600;
        color: var(--color-black);
        letter-spacing: 1px;
        padding: 1px 2px;
        border-radius: 4px;
    }
    @media screen and (max-width: 550px) {
        .right .title {
            line-height: 18px;
        }
    }

    .middle-row {
        margin-top: 20px;
        display: grid;
        grid-template-columns: 1fr;
        grid-row-gap: calc(0.6rem + 0.09vw);
        align-items: center;
    }

    .location,
    .type,
    .status {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 14px;
    }

    .status span {
        background-color: #fefe7d;
        padding: 2px 15px;
        border-radius: 6px;
        text-transform: uppercase;
        font-size: 12.5px;
        font-weight: 400;
        letter-spacing: 1px;
    }
    .status span.pending {
        background-color: #fefe7d;
    }
    .status span.declined {
        background-color: #feb69a;
    }
    .status span.interview {
        background-color: #a0ffa3;
    }
    .end-row {
        margin-top: calc(18px + 0.4vw);
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .end-row .detail-btn {
        padding: 4px 18px;
        text-transform: capitalize;
        background-color: var(--color-black);
        color: var(--color-white);
        border-radius: 4px;
        letter-spacing: 1px;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.3s linear;
        border: none;
    }
    .end-row .detail-btn:hover {
        background-color: var(--color-accent);
    }
    .end-row .apply-btn {
        padding: 4px 18px;
        text-transform: capitalize;
        background-color: var(--color-accent);
        color: var(--color-white);
        border-radius: 4px;
        letter-spacing: 1px;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.3s linear;
        border: none;
        outline: none;
    }
    .end-row .apply-btn:hover {
        background-color: var(--color-black);
    }
`;

const spacing = '20px';

const SectionWrapper = styled.div`
        padding: ${spacing};
        max-width: 1000px;
        height: 400px;
        overflow: auto;
        // margin: ${spacing} auto;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        margin-bottom: ${spacing}; /* Add margin after */
        margin-top: ${spacing}; /* Add margin before */
        border-radius: 20px; /* Set the border radius */
        &::-webkit-scrollbar {
            width: 0;
        }
        &:after {
            content: ''; /* Add content for pseudo-element */
            display: block; /* Ensure the pseudo-element is a block element */
            height: ${props => props.spacing}; /* Set the height of the extra space */
            width: 100%; /* Occupy full width */
        }
`;

const SectionWrapper_tile = styled.div`
        padding: ${spacing};
        width: 300px;
        // margin: ${spacing} auto;
        box-shadow: rgba(100, 100, 111, 0.3) 0px 7px 29px 0px;
        margin-bottom: ${spacing}; /* Add margin after */
        margin-top: ${spacing}; /* Add margin before */
        border-radius: 20px; /* Set the border radius */
`;

const RowThing = styled.div`
    display: flex;
    justify-content: center; /* Center the content horizontally */
    gap: 20px; /* Add spacing between the elements */
    padding: ${spacing};
    max-width: 100%; /* Spread across entire width */
    box-shadow: rgba(100, 100, 111, 0.3) 0px 7px 29px 0px;
    margin-bottom: ${spacing}; /* Add margin after */
    margin-top: ${spacing}; /* Add margin before */
    border-radius: 20px; /* Set the border radius */
`;

const Wrapper1 = styled.section`
    padding: ${spacing} 0;
    max-width: 1000px;
    margin: 0 auto;
    margin-bottom: ${spacing}; /* Add margin after */
    margin-top: ${spacing}; /* Add margin before */
`;

const JobHeader = styled.div`
    text-align: center;
    margin-bottom: ${spacing}; /* Add margin after */
    margin-top: ${spacing}; /* Add margin before */
`;

const JobTitle = styled.h2`
    font-size: 1.8rem;
    margin-bottom: 5px;
`;

const JobTitle_header = styled.h1`
    font-size: 1.2rem;
    font-weight: 600;   
    margin-bottom: 5px;
`;

const Company = styled.h4`
    font-size: 0.95rem;
    font-weight: 400;
    opacity: 0.8;
    text-transform: capitalize;
`;

const PostedDate = styled.div`
    font-size: 1rem;
    opacity: 0.8;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: ${spacing}; /* Add margin after */
    margin-top: ${spacing}; /* Add margin before */
`;

const ErrorMessage = styled.h2`
    text-align: center;
    margin-top: 50px;
    font-size: 1.6rem;
    color: red;
    margin-bottom: ${spacing}; /* Add margin after */
`;

const JobDetails = styled.div`
    .${Wrapper} & {
        margin-bottom: ${spacing};
    }
`;

const SectionTitle = styled.h3`
    font-size: 1.4rem;
    font-weight: 600;
    margin: 10px;
`;

const DescriptionSection = styled.div`
    margin-bottom: ${spacing}; /* Add margin after */
    margin-top: ${spacing}; /* Add margin before */
`;

const Description = styled.p`
    font-size: 1.2rem;
    line-height: 1.6;
    opacity: 0.8;
`;

const Deadline = styled.h4`
    font-size: 1.2rem;
    opacity: 0.8;
    margin-bottom: 10px;
`;

const JobInfo = styled.div`
    margin-bottom: ${spacing}; /* Add margin after */
    margin-top: ${spacing}; /* Add margin before */
`;

const InfoTitle = styled.h4`
    font-size: 0.91rem;
    font-weight: 400;
    // margin-bottom: 10px;
`;

const Info = styled.span`
    font-size: 0.87rem;
    opacity: 1.0;
    // margin-bottom: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const Requirements = styled.div`
    margin-bottom: ${spacing}; /* Add margin after */
    margin-top: ${spacing}; /* Add margin before */
`;

const Facilities = styled.div`
    margin-bottom: ${spacing}; /* Add margin after */
    margin-top: ${spacing}; /* Add margin before */
`;

const ListItem = styled.li`
    font-size: 1.2rem;
    opacity: 0.8;
`;

const Salary = styled.h4`
    font-size: 1.2rem;
    opacity: 0.8;
    margin-bottom: 10px;
`;

const ApplySection = styled.div`
    margin-bottom: ${spacing}; /* Add margin after */
    margin-top: ${spacing}; /* Add margin before */
`;

const IntroText = styled.p`
    font-size: 1.2rem;
    opacity: 0.8;
    // margin-bottom: 10px;
`;

const ContactInfo = styled.p`
    font-size: 1.2rem;
    opacity: 0.8;
    margin-bottom: ${spacing}; /* Add margin after */
    margin-top: ${spacing}; /* Add margin before */
`;



export default JobCard;
