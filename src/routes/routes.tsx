import {
    createBrowserRouter,
} from "react-router";
import LoginPage from "../pages/public/auth/login/page.tsx";
import LandingPage from "../pages/public/page.tsx";
import DashboardPage from "../pages/main/dashboard/page.tsx";
import PasswordsPage from "../pages/main/passwords/page.tsx";
import RegisterPage from "../pages/public/auth/register/page.tsx";
import Layout from "../pages/main/layout.tsx";
import MainLayout from "../pages/layout.tsx";

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
                        Component: DashboardPage
                    },
                    {
                        path: "passwords",
                        Component: PasswordsPage
                    }
                ],
            },
        ]
    }
]);

export {router}