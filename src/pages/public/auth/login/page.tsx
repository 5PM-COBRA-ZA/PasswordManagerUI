import logo from '/logo.svg';
import './page.css';
import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";
import "primeflex/primeflex.css";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {NavLink, useNavigate} from "react-router";
import {type ChangeEvent, type FormEvent, useEffect, useState} from "react";
import {type Store, use_store} from "../../../../store/store.tsx";
import AuthService from "../auth-service.tsx";

const service = new AuthService();

const CONSTANTS = {
    username: 'username',
    password: 'password'
}

const LoginPage = () => {
    const navigate = useNavigate();
    const set_messages = use_store((state: Store) => state.set_messages);
    const set_loading = use_store((state: Store) => state.set_loading);
    const set_profile = use_store((state: Store) => state.set_profile);
    const [submitting, set_submitting]  = useState<boolean>(false);
    const [errors, set_errors]  = useState<Map<string, string[]>>(new Map());
    const [username, set_username]  = useState<string>('');
    const [password, set_password]  = useState<string>('');

    useEffect(() => {
        if(submitting){
            set_submitting(false);

            const dto = new FormData();
            dto.append(CONSTANTS.username, username);
            dto.append(CONSTANTS.password, password);
            service.login(
                dto,
                (response: any) => {
                    if(response?.user?.id){
                        set_messages(response.detail.messages);
                        set_profile(response.user);
                        navigate('/dashboard');
                    }else
                        set_errors(response?.detail?.errors);
                },
                set_messages,
                set_loading,
                set_errors
            )
        }
    }, [submitting, username, password])

    const submit_handler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        set_submitting(true);
    }

    const username_on_change = (e: ChangeEvent<HTMLInputElement>) => {
        set_username(e.target.value)
    }

    const password_on_change = (e: ChangeEvent<HTMLInputElement>) => {
        set_password(e.target.value)
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
                    name={CONSTANTS.username}
                    className={'w-full'}
                    onChange={username_on_change}
                    value={username}
                />
                {errors?.has(CONSTANTS.username) &&
                    <div className={'flex justify-content-start'}>
                        {errors?.get(CONSTANTS.username)?.map(message => <small className={'p-error'}
                                                                                key={message}>{message}</small>)}
                    </div>
                }
            </div>
            <div className={'field'}>
                <label>Password</label>
                <InputText
                    name={CONSTANTS.password}
                    type={'password'}
                    className={'w-full'}
                    onChange={password_on_change}
                    value={password}
                />
                {errors?.has(CONSTANTS.password) &&
                    <div className={'flex justify-content-start'}>
                        {errors?.get(CONSTANTS.password)?.map(message => <small className={'p-error'}
                                                                                key={message}>{message}</small>)}
                    </div>
                }
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
