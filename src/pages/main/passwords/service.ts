import Service from "../../../api/service.tsx";
import {addSearchParam} from "../../../utilities/utilities.ts";

class PasswordsService extends Service {
    get_base_url(): string {
        return '/passwords';
    }

    get_passwords(
        page: string,
        size: string,
        search_term: string,
        order: string,
        direction: string,
        on_success: (response: any) => void,
        on_failed: (response: any) => void,
        set_loading: (loading: boolean) => void,
    ){
        const query_params = new URLSearchParams();
        const params = this.get_params();
        addSearchParam(query_params, params.page, (+page).toString());
        addSearchParam(query_params, params.paginate, size);
        addSearchParam(query_params, params.order, order);
        addSearchParam(query_params, params.direction, direction);
        addSearchParam(query_params, params.search, search_term);

        this.get(
            `${this.get_base_url()}?${query_params.toString()}`,
            on_success,
            on_failed,
            set_loading,
        )
    }

    get_password(
        id: string,
        on_success: (response: any) => void,
        on_failed: (response: any) => void,
        set_loading: (loading: boolean) => void,
    ){
        this.get(
            `${this.get_base_url()}/${id}`,
            on_success,
            on_failed,
            set_loading,
        )
    }
}

export default PasswordsService;