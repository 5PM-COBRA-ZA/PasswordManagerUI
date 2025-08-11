import {Toast} from "primereact/toast";
import {Outlet} from "react-router";
import {useEffect, useRef} from "react";
import {use_store} from "../store/store.tsx";
import type {Message} from "./models.tsx";
import LoadingOverlay from "../components/misc/loading-overlay.tsx";

const MainLayout = () => {
    const toast = useRef(null);
    const messages = use_store((state: any) => state.messages);
    const is_loading = use_store((state: any) => state.is_loading);

    useEffect(() => {
        if(messages && Array.isArray(messages) && messages.length > 0){
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            toast.current.show(
                messages?.map((message: Message) => {
                    return(
                        {
                            severity: message.type,
                            summary: message.type.toUpperCase(),
                            detail: message.message,
                            life: 3000
                        }
                    );
                })
            )
        }
    }, [messages]);
    
    
    return(
        <>
            <Toast ref={toast} />
            {is_loading && <LoadingOverlay />}
            <Outlet />
        </>
    );
};

export default MainLayout;