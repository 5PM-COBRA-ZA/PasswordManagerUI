import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import type {Password} from "./model.ts";
import {type ChangeEvent, type FormEvent, useEffect, useState} from "react";
import PasswordsService from "./service.ts";
import {type Store, use_store} from "../../../store/store.tsx";
import {append_form_data} from "../../../utilities/utilities.ts";

interface PasswordFormProps {
    password?: Password,
    on_close: (refresh: boolean) => void
}

const CONSTANTS = {
    website: 'website',
    username: 'username',
    password: 'password',
}

const service = new PasswordsService();

const PasswordForm = (props: PasswordFormProps) => {
    const [submitting, set_submitting] = useState<boolean>(false);
    const [website, set_website] = useState<string>('');
    const [username, set_username] = useState<string>('');
    const [password, set_password] = useState<string>('');
    const [errors, set_errors]  = useState<Map<string, string[]>>(new Map());

    const set_messages = use_store((state: Store) => state.set_messages);
    const set_loading = use_store((state: Store) => state.set_loading);

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
            append_form_data(dto, CONSTANTS.website, website)
            append_form_data(dto, CONSTANTS.username, username)
            append_form_data(dto, CONSTANTS.password, password)

            if(props.password){
                service.update_password(
                    props.password.id,
                    dto,
                    (response: any) => {
                        set_messages(response?.detail?.messages);
                        props.on_close(true);
                    },
                    set_messages,
                    set_loading,
                    set_errors
                )
            }else{
                service.add_password(
                    dto,
                    (response: any) => {
                        set_messages(response?.detail?.messages);
                        props.on_close(true);
                    },
                    set_messages,
                    set_loading,
                    set_errors
                )
            }
        }
    }, [submitting, website, username, password, props.password]);

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
                    type={'submit'}
                    onClick={() => set_submitting(true)}
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
            onHide={() => props.on_close(false)}
            footer={_footer}>
            <form onSubmit={submit_handler} className={'flex flex-column'} >
                <div className="field">
                    <label htmlFor={CONSTANTS.website}>website</label>
                    <InputText
                        className={`w-full ${errors?.has(CONSTANTS.website) && 'p-error'}`}
                        name={CONSTANTS.website}
                        value={website}
                        onChange={website_change_handler}
                        required
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
                        required
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
                        type={'password'}
                        required
                    />
                    {errors?.has(CONSTANTS.password) &&
                        <div className={'flex justify-content-start'}>
                            {errors?.get(CONSTANTS.password)?.map((message: string) => <small className={'p-error'}
                                                                                              key={message}>{message}</small>)}
                        </div>
                    }
                </div>
                <input style={{display: 'none'}} type={'submit'} />
            </form>
        </Dialog>
    );
};

export default PasswordForm;