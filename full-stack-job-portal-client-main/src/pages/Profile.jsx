import React from "react";

import { Link } from "react-router-dom";

import { FiEdit } from "react-icons/fi";
import { GrPowerReset } from "react-icons/gr";

import styled from "styled-components";

import avatar from "../assets/media/avatar.jpg";

import { useUserContext } from "../context/UserContext";

import advancedFormat from "dayjs/plugin/advancedFormat";
import dayjs from "dayjs";
dayjs.extend(advancedFormat);

const Profile = () => {
    const { user } = useUserContext();
    const date = dayjs(user?.createdAt).format("MMM Do, YYYY");

    return (

        <Wrapper>
            <SectionWrapper>
                <JobTitle_header style={{ paddingBottom: "20px" , paddingLeft: "35px",paddingTop: "23px" }}>Information</JobTitle_header>
                <div className="profile-container" style={{paddingLeft: "35px"}} >
                    <div className="first-col">
                        <img src={avatar} alt="avatar" className="avatar" />
                        <div className=" flex flex-col justify-center items-center mt-6">
                            <Link
                                to={`/dashboard/edit-profile/${user?._id}}`}
                                className="flex items-center"
                            >
                                <FiEdit />
                                <span className="text-xs capitalize ml-1 font-medium ">
                                    Edit
                                </span>
                            </Link>
                            {/* <Link to="" className="flex items-center mt-3">
                                <GrPowerReset />
                                <span className="text-xs capitalize ml-1 font-medium ">
                                    Reset Password
                                </span>
                            </Link> */}
                        </div>
                    </div>
                    <table className="information-table">
                        <tbody>
                            <tr className="row">
                                <td className="info">Username :</td>
                                <td className="value">{user?.username}</td>
                            </tr>
                            <tr className="row">
                                <td className="info">Name :</td>
                                <td className="value">{user?.name}</td>
                            </tr>
                            {/* <tr className="row">
                                <td className="info">Role :</td>
                                <td className="value">{user?.role}</td>
                            </tr> */}
                            <tr className="row">
                                <td className="info">Email :</td>
                                <td className="value email">{user?.email}</td>
                            </tr>
                            <tr className="row">
                                <td className="info">Join :</td>
                                <td className="value">{date}</td>
                            </tr>
                            {/* <tr className="row">
                                <td className="info">Location :</td>
                                <td className="value">
                                    {user?.location || "not available"}
                                </td>
                            </tr> */}
                            <tr className="row">
                                <td className="info"></td>
                                <td className="value"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* <p className="resume text-justify">
                    <span className="info">resume</span>
                    <span className="value overflow-hidden">
                        {user?.resume}
                    </span>
                </p> */}
            </SectionWrapper>
            {/* <div className="wrapper">
                <h5 className="title">Reset Password</h5>
            </div> */}
        </Wrapper>
    );
};

const Wrapper = styled.section`
    width: 100%;
    height: 100%;
    padding-top: calc(1rem + 1vh);
    padding-bottom: calc(1rem + 1vh);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;

    .wrapper {
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1),
            -2px -2px 4px rgba(0, 0, 0, 0.1);
        padding: 2rem;
        border-radius: 6px;
        width: 100%;
        max-width: 600px;
    }
    .title {
        font-size: calc(22px + 0.5vw);
        text-transform: capitalize;
        font-weight: 700;
        color: #0000009c;
        margin-bottom: calc(20px + 1vw);
    }
    .avatar {
        width: 100%;
        max-width: 250px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
    }
    .profile-container {
        display: flex;
        justify-content: center;
        gap: calc(20px + 2vw);
    }
    @media screen and (max-width: 600px) {
        .wrapper {
            width: 100%;
            padding: 2rem 1rem;
        }
    }
    @media screen and (max-width: 485px) {
        .profile-container {
            flex-direction: column;
        }
        .avatar {
            max-width: 200px;
        }
    }
    .first-col {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .information-table {
        border-collapse: collapse;
        border-spacing: 0;
        width: 100%;
    }

    .information-table .info {
        width: 120px;
    }
    .information-table .value {
        width: calc(100% - 120px);
    }
    .information-table .value.email {
        width: calc(100% - 120px);
        text-transform: none;
    }

    th.row,
    td {
        text-align: left;
        padding: 5px;
    }

    td {
        font-size: calc(12px + 0.15vw);
        font-weight: 500;
        text-transform: capitalize;
        color: #00000097;
        margin-bottom: 20px;
    }
    td.value {
        color: #000000e0;
    }
    @media screen and (max-width: 785px) {
        .title {
            margin-bottom: 25px;
        }
        .information-table .info {
            width: 40%;
        }
        .information-table .value {
            width: 60%;
        }
    }
`;

const spacing = '20px';

const SectionWrapper = styled.div`
        padding: ${spacing};
        max-width: 1000px;
        height: 350px;
        overflow: auto;
        box-shadow: rgba(100, 100, 111, 0.3) 0px 7px 29px 0px;
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
    font-size: 1.9rem;
    font-weight: 550;   
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

export default Profile;
