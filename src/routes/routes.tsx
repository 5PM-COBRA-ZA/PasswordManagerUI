import {
    createBrowserRouter,
} from "react-router";
import LoginPage from "../pages/public/auth/login/page.tsx";
import LandingPage from "../pages/public/page.tsx";
import DashboardPage from "../pages/main/dashboard/page.tsx";
import PasswordsPage from "../pages/main/passwords/page.tsx";
import RegisterPage from "../pages/public/auth/register/page.tsx";
import Layout from "../pages/main/layout.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                index: true,
                element: <LandingPage />,
            },
            {
                path: "auth",
                children: [
                    {
                        path: "login",
                        element: <LoginPage />
                    },
                    {
                        path: "register",
                        element: <RegisterPage />
                    },
                ],
            },
            {
                path: "dashboard",
                element: <Layout />,
                children: [
                    {
                        index: true,
                        element: <DashboardPage />
                    },
                    {
                        path: "passwords",
                        element: <PasswordsPage />
                    }
                ],
            },
        ]
    }
]);

export {router}