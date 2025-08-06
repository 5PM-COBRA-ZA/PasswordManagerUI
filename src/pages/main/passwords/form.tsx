import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";

interface PasswordFormProps {
    on_close: () => void
}

const PasswordForm = (props: PasswordFormProps) => {
    const _footer = () => {
        return (
            <div className={'flex justify-content-between align-items-center'}>
                <Button
                    icon={'pi pi-trash px-2'}
                    outlined
                    tooltip={'Remove'}
                />
                <Button
                    label={'Submit'}
                />
            </div>
        );
    }

    return (
        <Dialog
            header="Add Password"
            visible={true}
            style={{ width: '50vw' }}
            onHide={props.on_close}
            footer={_footer}>
            <div className={'flex flex-column'}>
                <div className="field">
                    <label>Website</label>
                    <InputText className={'w-full'}/>
                </div>
                <div className="field">
                    <label>Username</label>
                    <InputText className={'w-full'}/>
                </div>
                <div className="field mb-0">
                    <label>Password</label>
                    <InputText className={'w-full'}/>
                </div>
            </div>
        </Dialog>
    );
};

export default PasswordForm;