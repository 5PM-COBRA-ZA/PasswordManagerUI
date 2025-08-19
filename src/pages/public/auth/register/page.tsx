import '../page.css';
import "primeflex/primeflex.css";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {NavLink, useNavigate} from "react-router";
import {type ChangeEvent, type FormEvent, useEffect, useState} from "react";
import {type Store, use_store} from "../../../../store/store.tsx";
import AuthService from "../auth-service.ts";
import {append_form_data} from "../../../../utilities/utilities.ts";

const service = new AuthService();

const CONSTANTS = {
    email: 'email',
    name: 'name',
    password: 'password'
}

const logo_size = '55px';

const RegisterPage = () => {
    const navigate = useNavigate();
    const set_messages = use_store((state: Store) => state.set_messages);
    const set_loading = use_store((state: Store) => state.set_loading);
    const [submitting, set_submitting]  = useState<boolean>(false);
    const [errors, set_errors]  = useState<Map<string, string[]>>(new Map());
    const [email, set_email]  = useState<string>('');
    const [name, set_name]  = useState<string>('');
    const [password, set_password]  = useState<string>('');

    useEffect(() => {
        if(submitting){
            set_submitting(false);

            const dto = new FormData();
            append_form_data(dto, CONSTANTS.email, email);
            append_form_data(dto, CONSTANTS.name, name);
            append_form_data(dto, CONSTANTS.password, password);
            service.register(
                dto,
                (response: any) => {
                    if(response?.user?.id){
                        set_messages(response.detail.messages);
                        navigate('/auth/login');
                    }else
                        set_errors(response?.detail?.errors);
                },
                set_messages,
                set_loading,
                set_errors
            )
        }
    }, [submitting, email, name, password])

    const submit_handler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        set_submitting(true);
    }

    const email_on_change = (e: ChangeEvent<HTMLInputElement>) => {
        set_email(e.target.value)
    }

    const name_on_change = (e: ChangeEvent<HTMLInputElement>) => {
        set_name(e.target.value)
    }

    const password_on_change = (e: ChangeEvent<HTMLInputElement>) => {
        set_password(e.target.value)
    }

    return (
        <form className={'creds-card'} onSubmit={submit_handler}>
            <div className={'creds-logo'}>
                <svg height={logo_size} className={'logo_svg'}>
                    <use height={logo_size} xlinkHref="/logo.svg#logo_svg"></use>
                </svg>
            </div>
            <div>
                <h1>Register</h1>
            </div>
            <div className={'field'}>
                <label>Email</label>
                <InputText
                    name={CONSTANTS.email}
                    className={`w-full ${errors?.has(CONSTANTS.email) && 'p-invalid'}`}
                    onChange={email_on_change}
                    value={email}
                    required
                />
                {errors?.has(CONSTANTS.email) &&
                    <div className={'flex justify-content-start'}>
                        {errors?.get(CONSTANTS.email)?.map(message => <small className={'p-error'}
                                                                             key={message}>{message}</small>)}
                    </div>
                }
            </div>
            <div className={'field'}>
                <label>Name</label>
                <InputText
                    name={CONSTANTS.name}
                    className={`w-full ${errors?.has(CONSTANTS.name) && 'p-invalid'}`}
                    onChange={name_on_change}
                    value={name}
                    required
                />
                {errors?.has(CONSTANTS.name) &&
                    <div className={'flex justify-content-start'}>
                        {errors?.get(CONSTANTS.name)?.map(message => <small className={'p-error'}
                                                                             key={message}>{message}</small>)}
                    </div>
                }
            </div>
            <div className={'field'}>
                <label>Password</label>
                <InputText
                    name={CONSTANTS.password}
                    type={'password'}
                    className={`w-full ${errors?.has(CONSTANTS.password) && 'p-invalid'}`}
                    onChange={password_on_change}
                    value={password}
                    required
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
                    label={'Continue'}
                    className={'w-full'}
                />
                <div className={'flex justify-content-end gap-1'}>
                    Already have an account?
                    <NavLink style={{textDecoration: 'none'}} to='/auth/login'>Login</NavLink>
                </div>
            </div>
        </form>
    )
}

export default RegisterPage
