import Service from "../../../api/service.tsx";

class AuthService extends Service{

    get_base_url(): string {
        return '/auth'
    }

    login(
        dto: FormData,
        on_success: (response: any) => void,
        on_failed: (response: any) => void,
        set_loading: (loading: boolean) => void,
        on_errors: (response: any) => void
    ){
        this.post(
            `${this.get_base_url()}/login`,
            on_success,
            on_failed,
            set_loading,
            dto,
            false,
            on_errors
        )
    }

    register(
        dto: FormData,
        on_success: (response: any) => void,
        on_failed: (response: any) => void,
        set_loading: (loading: boolean) => void,
        on_errors: (response: any) => void
    ){
        this.post(
            `${this.get_base_url()}/register`,
            on_success,
            on_failed,
            set_loading,
            dto,
            false,
            on_errors
        )
    }

    update_profile(
        dto: FormData,
        on_success: (response: any) => void,
        on_failed: (response: any) => void,
        set_loading: (loading: boolean) => void,
        on_errors: (response: any) => void
    ){
        this.patch(
            `${this.get_base_url()}/profile`,
            on_success,
            on_failed,
            set_loading,
            dto,
            false,
            on_errors
        )
    }

    get_profile(
        on_success: (response: any) => void,
        on_failed: (response: any) => void,
        set_loading: (loading: boolean) => void,
    ){
        this.get(
            `${this.get_base_url()}/profile`,
            on_success,
            on_failed,
            set_loading,
        )
    }
}

export default AuthService;