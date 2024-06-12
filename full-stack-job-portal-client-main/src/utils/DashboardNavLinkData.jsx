import React from "react";

import { IoIosStats } from "react-icons/io";
import { RiMenuAddFill } from "react-icons/ri";
import { FiUser } from "react-icons/fi";
import { FaUserShield } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { FaBriefcase } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { BiBook } from "react-icons/bi";

const AdminLinks = [
    {
        text: "profile",
        path: ".",
        icon: <FiUser />,
    },
    {
        text: "stats",
        path: "stats",
        icon: <IoIosStats />,
    },
    {
        text: "admin",
        path: "admin",
        icon: <FaUserShield />,
    },
    {
        text: "manage users",
        path: "manage-users",
        icon: <FaUsers />,
    },
    {
        text: "Projects",
        path: "all-jobs",
        icon: <BiBook />,
    },
];

const RecruiterLinks = [
    {
        text: "Profile",
        path: ".",
        icon: <FiUser />,
    },
    {
        text: "Add Project",
        path: "add-jobs",
        icon: <RiMenuAddFill />,
    },
    {
        text: "Manage Projects",
        path: "manage-jobs",
        icon: <MdManageAccounts />,
    },
    {
        text: "Applications",
        path: "my-jobs",
        icon: <FaBriefcase />,
    },
    {
        text: "Projects",
        path: "all-jobs",
        icon: <BiBook />,
    },
];

const UserLinks = [
    {
        text: "profile",
        path: ".",
        icon: <FiUser />,
    },
    {
        text: "Applications",
        path: "my-jobs",
        icon: <FaBriefcase />,
    },
    {
        text: "Projects",
        path: "all-jobs",
        icon: <BiBook />,
    },
];

export { AdminLinks, RecruiterLinks, UserLinks };
