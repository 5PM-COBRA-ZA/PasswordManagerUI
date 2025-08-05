import logo from '/logo.svg';
import './page.css';
import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";
import "primeflex/primeflex.css";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {NavLink, useNavigate} from "react-router";
import type {FormEvent} from "react";

const LoginPage = () => {
    const navigate = useNavigate();

    const submit_handler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate("/dashboard");
    }

    return (
        <form className={'creds-card'} onSubmit={submit_handler}>
            <div className={'creds-logo'}>
                <a href="/" target="_blank">
                    <img height={55} src={logo} className="logo" alt="JPass Logo"/>
                </a>
            </div>
            <div>
                <h1>Login</h1>
            </div>
            <div className={'field'}>
                <label>Email</label>
                <InputText
                    className={'w-full'}
                />
            </div>
            <div className={'field'}>
                <label>Password</label>
                <InputText
                    type={'password'}
                    className={'w-full'}
                />
            </div>

            <div className="flex flex-column gap-1">
                <Button
                    label={'Login'}
                    className={'w-full'}
                />
                <div className={'flex justify-content-end gap-1'}>
                    Don't have an account?
                    <NavLink style={{textDecoration: 'none'}} to='/auth/register'>Sign up</NavLink>
                </div>
            </div>
        </form>
    )
}

export default LoginPage
