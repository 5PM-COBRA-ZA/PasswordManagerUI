import {Panel} from "primereact/panel";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {type ChangeEvent, type FormEvent, useEffect, useState} from "react";
import {append_form_data} from "../../../utilities/utilities.ts";
import {type Store, use_store} from "../../../store/store.tsx";
import AuthService from "../../public/auth/auth-service.ts";

const service = new AuthService();

const CONSTANTS = {
    email: 'email',
    name: 'name',
    password: 'password'
}

const UserSettingsPage = () => {
    const profile = use_store((state: Store) => state.profile);
    const set_messages = use_store((state: Store) => state.set_messages);
    const set_loading = use_store((state: Store) => state.set_loading);
    const [submitting, set_submitting]  = useState<boolean>(false);
    const [errors, set_errors]  = useState<Map<string, string[]>>(new Map());
    const [email, set_email]  = useState<string>('');
    const [name, set_name]  = useState<string>('');
    const [password, set_password]  = useState<string>('');

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

    useEffect(() => {
        if(submitting){
            set_submitting(false);

            const dto = new FormData();
            if(profile?.email != email)
                append_form_data(dto, CONSTANTS.email, email);
            append_form_data(dto, CONSTANTS.name, name);
            append_form_data(dto, CONSTANTS.password, password);
            service.update_profile(
                dto,
                (response: any) => {
                    if(response?.user?.id){
                        set_messages(response.detail.messages);
                    }else
                        set_errors(response?.detail?.errors);
                },
                set_messages,
                set_loading,
                set_errors
            )
        }
    }, [submitting, email, name, password, profile])

    // Prepopulate fields
    useEffect(() => {
        if(profile){
            set_email(profile.email);
            set_name(profile.name);
        }
    }, [profile]);

    return(
        <form onSubmit={submit_handler} className={'grid card'}>
            <div className={'col-6'}>
                <Panel header="Edit Profile">
                    <div className={'flex flex-column'}>
                        <div className="field">
                            <label htmlFor={CONSTANTS.email}>email</label>
                            <InputText
                                className={`w-full ${errors?.has(CONSTANTS.email) && 'p-error'}`}
                                name={CONSTANTS.email}
                                value={email}
                                onChange={email_on_change}
                            />
                            {errors?.has(CONSTANTS.email) &&
                                <div className={'flex justify-content-start'}>
                                    {errors?.get(CONSTANTS.email)?.map((message: string) => <small
                                        className={'p-error'}
                                        key={message}>{message}</small>)}
                                </div>
                            }
                        </div>
                        <div className="field">
                            <label htmlFor={CONSTANTS.name}>name</label>
                            <InputText
                                className={`w-full ${errors?.has(CONSTANTS.name) && 'p-error'}`}
                                name={CONSTANTS.name}
                                value={name}
                                onChange={name_on_change}
                            />
                            {errors?.has(CONSTANTS.name) &&
                                <div className={'flex justify-content-start'}>
                                    {errors?.get(CONSTANTS.name)?.map((message: string) => <small
                                        className={'p-error'}
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
                            />
                            <small>Only fill in if you want to change your password.</small>
                            {errors?.has(CONSTANTS.password) &&
                                <div className={'flex justify-content-start'}>
                                    {errors?.get(CONSTANTS.password)?.map(message => <small className={'p-error'}
                                                                                            key={message}>{message}</small>)}
                                </div>
                            }
                        </div>
                    </div>
                </Panel>
            </div>
            <div className="col-6">
                <Panel header="Other Settings">
                    <p className="m-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                        id est laborum.
                    </p>
                </Panel>
            </div>
            <div className={'col-12'}>
                <div className={'flex justify-content-end'}>
                    <Button label={'Submit'} type={'submit'} />
                </div>
            </div>
        </form>
    );
};

export default UserSettingsPage;