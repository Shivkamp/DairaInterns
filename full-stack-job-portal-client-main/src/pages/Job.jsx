import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { getSingleHandler } from "../utils/FetchHandlers";
import LoadingComTwo from "../components/shared/LoadingComTwo";

import advancedFormat from "dayjs/plugin/advancedFormat";
import dayjs from "dayjs";
dayjs.extend(advancedFormat);

import { MdAccessTime } from "react-icons/md";
import Navbar from "../components/shared/Navbar";

import { Link } from "react-router-dom";
import { postHandler } from "../utils/FetchHandlers";
import Swal from "sweetalert2";

import { useUserContext } from "../context/UserContext";
// import advancedFormat from "dayjs/plugin/advancedFormat";
// import dayjs from "dayjs";
dayjs.extend(advancedFormat);

const Job = () => {
    const { id } = useParams();
    const {
        isLoading,
        isError,
        data: job,
        error,
    } = useQuery({
        queryKey: ["job"],
        queryFn: () =>
            getSingleHandler(
                `http://localhost:3000/api/v1/jobs/${id}`
            ),
    });

    const handleResumeView = (drive) => {
        if (!drive) {
            Swal.fire({
                icon: "error",
                title: "Empty Link",
                text: "The faculty has not provided a valid form link.",
            });
            return;
        }
    
        const newWindow = window.open(drive, "_blank");
        if (newWindow) {
            newWindow.focus();
        } else {
            alert("Please allow pop-ups for this site to open the PDF.");
        }
    };

    // const date = dayjs(job?.jobDeadline).format("MMM Do, YYYY");

    if (isLoading) {
        return <LoadingComTwo />;
    }
    if (isError) {
        return <h2 className="">{error?.message}</h2>;
    }
    // if (job) {
    //     console.log(job.result);
    // }
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
        <>
            <Navbar />
            <Wrapper>
                <JobHeader>
                    <JobTitle_header>
                        {/* <span className="capitalize ">Project Title: </span> */}
                        <JobTitle_header>{job?.position}</JobTitle_header>
                    </JobTitle_header>
                    <Company>
                        <span className="fancy">Posted by: </span>
                        <Info>{job?.company}</Info>
                    </Company>
                    <PostedDate>
                        <MdAccessTime className="text-lg mr-1" />
                        {dayjs(job?.result?.createdAt).format("MMM Do, YYYY")}
                    </PostedDate>
                </JobHeader>
                <div className="middle-row">
                    <RowThing>

                        <SectionWrapper_tile>
                            <Facilities>
                                {/* Project Vacancy: <span className="">{job?.jobVacancy}</span> */}
                                <InfoTitle>Project Vacancy</InfoTitle>
                                <Info>{job?.jobVacancy}</Info>
                            </Facilities>
                        </SectionWrapper_tile>

                        <SectionWrapper_tile>
                            <Facilities>
                                <InfoTitle>Domain</InfoTitle>
                                <Info>{job?.jobSalary}</Info>
                            </Facilities>

                        </SectionWrapper_tile>
                        <SectionWrapper_tile style={{ textAlign: "center" }}>
                            <Facilities>
                                {/* Project Vacancy: <span className="">{job?.jobVacancy}</span> */}
                                <button
                                    className="action form"
                                    style={{ fontSize: "1.2em", fontWeight: "bold",  textAlign: "center"  }}
                                    onClick={() =>
                                        handleResumeView(job?.jobTextField)
                                    }
                                >
                                    Form Link
                                </button>
                            </Facilities>
                        </SectionWrapper_tile>

                    </RowThing>
                    <SectionWrapper>
                        <Facilities>

                            <InfoTitle>Skill Level</InfoTitle>
                            <Info>{job?.jobPerks}</Info>
                        </Facilities>

                    </SectionWrapper>
                    <SectionWrapper>
                        <DescriptionSection>
                            <InfoTitle>Description</InfoTitle>
                            <Info>{job?.jobDescription}</Info>
                            <InfoTitle>Deadline</InfoTitle>
                            <Info>{job?.jobDeadline} Months</Info>
                        </DescriptionSection>
                    </SectionWrapper>
                    <SectionWrapper>
                        <Requirements>
                            <InfoTitle>Requirements</InfoTitle>
                            <Info>{job?.jobSkillz}</Info>
                        </Requirements>

                    </SectionWrapper>
                    {/* <div className="facility">
                        <h3 className="sec-title">Skill Level</h3>
                        <ul>
                            {job?.jobFacilities?.map((facility) => (
                                <li key={facility}>{facility}</li>
                            ))}
                        </ul>
                    </div> */}
                    {/* <h4 className="salary">
                        Domain: <span className="">{job?.jobSalary}</span>
                    </h4> */}
                    {user?.role === "user" && (
                        <ApplyButton
                            // className="apply-btn"
                            onClick={() => handleApply(job._id)}
                        >
                            Apply
                        </ApplyButton>
                    )}

                </div>
            </Wrapper>
        </>
    );
};

const spacing = '20px';

const SectionWrapper = styled.div`
        padding: ${spacing};
        display: flex;
        max-width: 1000px;
        // margin: ${spacing} auto;
        box-shadow: rgba(100, 100, 111, 0.3) 0px 7px 29px 0px;
        margin-bottom: ${spacing}; /* Add margin after */
        margin-top: ${spacing}; /* Add margin before */
        border-radius: 20px; /* Set the border radius */
        word-wrap: break-word; /* Make the text wrap around if it's too long */
`;

const SectionWrapper_tile = styled.div`
        padding: ${spacing};
        display: flex;
        width: 300px;
        // margin: ${spacing} auto;
        box-shadow: rgba(100, 100, 111, 0.3) 0px 7px 29px 0px;
        margin-bottom: ${spacing}; /* Add margin after */
        margin-top: ${spacing}; /* Add margin before */
        border-radius: 20px; /* Set the border radius */
        word-wrap: break-word; /* Make the text wrap around if it's too long */
`;


const SectionWrapper_tile1 = styled.div`k
        padding: ${spacing};
        display: flex;
        width: 200px;
        text-align: center;
        // margin: ${spacing} auto;
        margin-left: 500; /* Move to the right */
        box-shadow: rgba(100, 100, 111, 0.3) 0px 7px 29px 0px;
        margin-bottom: ${spacing}; /* Add margin after */
        margin-top: ${spacing}; /* Add margin before */
        border-radius: 20px; /* Set the border radius */
        align: center
`;
const centerballs = styled.div`
display: flex;
justify-content: center; /* Center the content horizontally */
background-color: --color-primary;
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
    word-wrap: break-word; /* Make the text wrap around if it's too long */
    
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center; /* Center the items vertically */
    }
`;

const Wrapper = styled.section`
    padding: ${spacing} 0;
    max-width: 1000px;
    margin: 0 auto;
    margin-bottom: ${spacing}; /* Add margin after */
    margin-top: ${spacing}; /* Add margin before */
    word-wrap: break-word; /* Make the text wrap around if it's too long */
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
    font-size: 2.3rem;
    font-weight: 600;   
    margin-bottom: 5px;
`;

const Company = styled.h4`
    font-size: 1.2rem;
    font-weight: 600;
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
    font-size: 1.2rem;
    font-weight: 600;
    // margin-bottom: 10px;
`;

const Info = styled.span`
    font-size: 0.95rem;
    opacity: 0.8;
    margin-bottom: 10px;
`;

const InfoBullet = styled.li`
    font-size: 0.95rem;
    opacity: 0.8;
    // margin-bottom: 10px;
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

const ApplyButton = styled.button`
    background-color: #ff7700;
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;    
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        background-color: #ff9f4b;
    }

    &:disabled {
        background-color: red;
        cursor: not-allowed;
    }
`;


export default Job;
