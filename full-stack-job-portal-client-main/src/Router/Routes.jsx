import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";
import DashboardLayout from "../Layout/DashboardLayout";
import { Navigate } from "react-router-dom";

// Pages
import {
    Register,
    Login,
    Landing,
    Error,
    AllJobs,
    Stats,
    Profile,
    Admin,
    EditJob,
    AddJob,
    ManageJobs,
    Job,
    MyJobs,
    EditProfile,
    ManageUsers,
} from "../pages";

import { JobContext } from "../context/JobContext";

import CommonProtectRoute from "../components/shared/CommonProtectRoute";
import ProtectAdminRoute from "../components/shared/ProtectAdminRoute";
import RecruiterRoute from "../components/shared/RecruiterRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout></HomeLayout>,
        errorElement: <Error />,
        children: [
            {
                index: true,
                // element: <Landing />,
                element: <Navigate to="/dashboard/all-jobs" replace />,
                
            },
            {
                path: "dashboard",
                element: (
                    <CommonProtectRoute>
                        <JobContext>
                            <DashboardLayout></DashboardLayout>
                        </JobContext>
                    </CommonProtectRoute>
                ),
                children: [
                    {
                        index: true,
                        element: <Profile />,
                    },
                    {
                        path: "edit-profile/:id",
                        element: <EditProfile />,
                    },
                    {
                        path: "stats",
                        element: (
                            <ProtectAdminRoute>
                                <Stats />
                            </ProtectAdminRoute>
                        ),
                    },
                    {
                        path: "add-jobs",
                        element: (
                            <RecruiterRoute>
                                <AddJob />
                            </RecruiterRoute>
                        ),
                    },
                    {
                        path: "manage-jobs",
                        element: (
                            <RecruiterRoute>
                                <ManageJobs />
                            </RecruiterRoute>
                        ),
                    },
                    {
                        path: "manage-users",
                        element: (
                            <ProtectAdminRoute>
                                <ManageUsers />
                            </ProtectAdminRoute>
                        ),
                    },
                    {
                        path: "admin",
                        element: (
                            <ProtectAdminRoute>
                                <Admin />
                            </ProtectAdminRoute>
                        ),
                    },
                    {
                        path: "edit-job/:id",
                        element: (
                            <RecruiterRoute>
                                <EditJob />
                            </RecruiterRoute>
                        ),
                    },
                    {
                        path: "my-jobs",
                        element: (
                            <CommonProtectRoute>
                                <MyJobs />
                            </CommonProtectRoute>
                        ),
                    },
                    // "all-jobs" route nested within "dashboard"
                    {
                        path: "all-jobs",
                        element: (
                            <CommonProtectRoute>
                                <AllJobs />
                            </CommonProtectRoute>
                        ),
                    },
                    {
                        path: "job/:id",
                        element: (
                            <CommonProtectRoute>
                                <JobContext>
                                    <Job />
                                </JobContext>
                            </CommonProtectRoute>
                        ),
                    },
                ],
            },
            // Redirect to dashboard for "all-jobs" when accessed via landing page
            {
                path: "all-jobs",
                element: <Navigate to="/dashboard/all-jobs" replace />,
            },
            {
                path: "register",
                element: <Register></Register>,
            },
            {
                path: "login",
                element: <Login></Login>,
            },
            // Define "job/:id" route here
            {
                path: "job/:id",
                element: (
                    <CommonProtectRoute>
                        <JobContext>
                            <Job />
                        </JobContext>
                    </CommonProtectRoute>
                ),
            },
        ],
    },
]);

export default router;
