import {
    createBrowserRouter,
} from "react-router";
import LoginPage from "../pages/public/auth/login/page.tsx";
import LandingPage from "../pages/public/page.tsx";
import DashboardLandingPage from "../pages/dashboard/landing/page.tsx";
import PasswordsPage from "../pages/dashboard/passwords/page.tsx";
import RegisterPage from "../pages/public/auth/register/page.tsx";
import Layout from "../pages/dashboard/layout.tsx";
import MainLayout from "../pages/layout.tsx";
import UserSettingsPage from "../pages/dashboard/settings/page.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: LandingPage,
            },
            {
                path: "auth",
                children: [
                    {
                        path: "login",
                        Component: LoginPage
                    },
                    {
                        path: "register",
                        Component: RegisterPage
                    },
                ],
            },
            {
                path: "dashboard",
                Component: Layout,
                children: [
                    {
                        index: true,
                        Component: DashboardLandingPage
                    },
                    {
                        path: "passwords",
                        Component: PasswordsPage
                    },
                    {
                        path: "profile",
                        children: [
                            {
                                path: "settings",
                                Component: UserSettingsPage
                            }
                        ]
                    }
                ],
            },
        ]
    }
]);

export {router}