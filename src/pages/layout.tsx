import {Toast} from "primereact/toast";
import {Outlet, useNavigate} from "react-router";
import {useEffect, useRef} from "react";
import {type Store, use_store} from "../store/store.tsx";
import type {Message} from "./models.tsx";
import LoadingOverlay from "../components/misc/loading-overlay.tsx";
import AuthService from "./public/auth/auth-service.ts";

const service = new AuthService();

const MainLayout = () => {
    const toast = useRef(null);
    const messages = use_store((state: Store) => state.messages);
    const is_loading = use_store((state: Store) => state.is_loading);
    const profile = use_store((state: Store) => state.profile);
    const set_profile = use_store((state: Store) => state.set_profile);
    const set_messages = use_store((state: Store) => state.set_messages);
    const set_loading = use_store((state: Store) => state.set_loading);
    const navigate = useNavigate();

    useEffect(() => {
        if(!profile?.id){
            service.get_profile(
                (response: any) => {
                    if(response?.user?.id){
                        set_profile(response.user);
                    }else{
                        navigate('/auth/login');
                    }
                },
                set_messages,
                set_loading
            )
        }
    }, [profile]);

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