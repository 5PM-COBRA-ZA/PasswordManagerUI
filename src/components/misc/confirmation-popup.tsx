import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

export interface ConfirmationProps {
    on_confirm: () => void,
    on_cancel: () => void,
    message: string,
    header: string
}

const ConfirmationPopup = (props: ConfirmationProps) => {

    const confirmationDialogFooter = (
        <>
            <Button type="button" label="No" onClick={props.on_cancel} outlined />
            <Button type="button" label="Yes" onClick={props.on_confirm} autoFocus />
        </>
    );

    return(
        <Dialog
            dismissableMask
            header={props.header}
            visible={true}
            onHide={props.on_cancel}
            style={{ width: '350px' }}
            modal
            footer={confirmationDialogFooter}>
            <div className="flex align-items-center justify-content-center">
                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                <span>{props.message}</span>
            </div>
        </Dialog>
    );
}

export default ConfirmationPopup;
