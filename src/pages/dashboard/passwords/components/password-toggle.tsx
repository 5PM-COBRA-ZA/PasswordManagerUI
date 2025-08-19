import {useEffect, useState} from "react";
import {Button} from "primereact/button";
import {type Store, use_store} from "../../../../store/store.tsx";
import Logger from "../../../../utilities/logger.ts";

interface PasswordToggleProps {
    password: string
}

const PasswordToggle = (props: PasswordToggleProps) => {
    const [masked, set_masked] = useState<boolean>(true);
    const [password, set_password] = useState<string>('');

    const set_messages = use_store((state: Store) => state.set_messages);

    useEffect(() => {
        if(props.password){
            let result = props.password;
            if(masked){
                const password = [];
                for(let x = 0; x < props.password.length; x++) {
                    password.push('*');
                }
                result = password.join('');
            }
            set_password(result);
        }
    }, [masked, props.password]);

    return(
        <div className={'flex justify-content-between align-items-center'}>
            <div
                 className={'passwords-toggle'}
            >
                {password}
            </div>
            <div className={'flex'}>
                <Button
                    className={'pi pi-clone'}
                    onClick={async (e: any) => {
                        e.preventDefault();
                        e.stopPropagation();
                        try{
                            await window.navigator.clipboard.writeText(props.password);
                            set_messages([{message: "Password copied to clipboard.", type: "success"}])
                        }catch (e: any){
                            set_messages([{message: "Failed to copy to clipboard.", type: "error"}])
                            Logger.warn(e);
                        }
                    }}
                    text
                    style={{width: '40px', color: 'var(--text-color)'}}
                />
                <Button
                    className={`pi pi-eye${!masked ? '-slash' : ''}`}
                    onClick={(e: any) => {
                        e.preventDefault();
                        e.stopPropagation();
                        set_masked((prev: boolean) => !prev);
                    }}
                    text
                    style={{width: '40px', color: 'var(--text-color)'}}
                />
            </div>
        </div>
    );
};

export default PasswordToggle;