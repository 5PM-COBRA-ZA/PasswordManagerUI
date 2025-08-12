import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import type {Password} from "./model.ts";
import {type ChangeEvent, type FormEvent, useEffect, useState} from "react";

interface PasswordFormProps {
    password?: Password,
    on_close: () => void
}

const CONSTANTS = {
    website: 'website',
    username: 'username',
    password: 'password',
}

const PasswordForm = (props: PasswordFormProps) => {
    const [submitting, set_submitting] = useState<boolean>(false);
    const [website, set_website] = useState<string>('');
    const [username, set_username] = useState<string>('');
    const [password, set_password] = useState<string>('');
    const [errors, set_errors]  = useState<Map<string, string[]>>(new Map());

    useEffect(() => {
        if(props.password){
            set_website(props.password.website);
            set_username(props.password.username);
            set_password(props.password.password);
        }
    }, [props.password]);

    useEffect(() => {
        if(submitting){
            set_submitting(false);
            const dto = new FormData();
            dto.append(CONSTANTS.website, website);
            dto.append(CONSTANTS.username, username);
            dto.append(CONSTANTS.password, password);

            //add/update user then close modal
            set_errors(new Map())
        }
    }, [submitting, website, username, password]);

    const submit_handler = (e: FormEvent) => {
        e.preventDefault();
        set_submitting(true);
    }


    const _footer = () => {
        return (
            <div className={'flex justify-content-between align-items-center'}>
                {props.password ?
                    <Button
                        icon={'pi pi-trash px-2'}
                        outlined
                        tooltip={'Remove'}
                    /> :
                    <div></div>
                }
                <Button
                    label={'Submit'}
                />
            </div>
        );
    }

    const _header = () => {
        return(`${props.password ? 'Update' : 'Add'} Password`);
    }

    const website_change_handler = (e: ChangeEvent<HTMLInputElement>) => {
        set_website(e.target.value)
    }

    const username_change_handler = (e: ChangeEvent<HTMLInputElement>) => {
        set_username(e.target.value)
    }

    const password_change_handler = (e: ChangeEvent<HTMLInputElement>) => {
        set_password(e.target.value)
    }

    return (
        <Dialog
            draggable={false}
            header={_header}
            visible={true}
            style={{ width: '50vw' }}
            onHide={props.on_close}
            footer={_footer}>
            <form className={'flex flex-column'} onSubmit={submit_handler}>
                <div className="field">
                    <label htmlFor={CONSTANTS.website}>website</label>
                    <InputText
                        className={`w-full ${errors?.has(CONSTANTS.website) && 'p-error'}`}
                        name={CONSTANTS.website}
                        value={website}
                        onChange={website_change_handler}
                    />
                    {errors?.has(CONSTANTS.website) &&
                        <div className={'flex justify-content-start'}>
                            {errors?.get(CONSTANTS.website)?.map((message: string) => <small className={'p-error'}
                                                                                          key={message}>{message}</small>)}
                        </div>
                    }
                </div>
                <div className="field">
                    <label htmlFor={CONSTANTS.username}>username</label>
                    <InputText
                        className={`w-full ${errors?.has(CONSTANTS.username) && 'p-error'}`}
                        name={CONSTANTS.username}
                        value={username}
                        onChange={username_change_handler}
                    />
                    {errors?.has(CONSTANTS.username) &&
                        <div className={'flex justify-content-start'}>
                            {errors?.get(CONSTANTS.username)?.map((message: string) => <small className={'p-error'}
                                                                                             key={message}>{message}</small>)}
                        </div>
                    }
                </div>
                <div className="field">
                    <label htmlFor={CONSTANTS.password}>password</label>
                    <InputText
                        className={`w-full ${errors?.has(CONSTANTS.password) && 'p-error'}`}
                        name={CONSTANTS.password}
                        value={password}
                        onChange={password_change_handler}
                    />
                    {errors?.has(CONSTANTS.password) &&
                        <div className={'flex justify-content-start'}>
                            {errors?.get(CONSTANTS.password)?.map((message: string) => <small className={'p-error'}
                                                                                              key={message}>{message}</small>)}
                        </div>
                    }
                </div>
            </form>
        </Dialog>
    );
};

export default PasswordForm;