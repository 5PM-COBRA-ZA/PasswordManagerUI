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
}

export default AuthService;