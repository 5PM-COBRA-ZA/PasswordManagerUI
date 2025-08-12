import { type ChangeEvent, useEffect, useState } from 'react';
import { type DataTableRowClickEvent, type DataTableStateEvent } from 'primereact/datatable';
import { SortOrder } from 'primereact/api';
import {ACTIONS, get_id_action_tab, PARAM_DELIMITER, PARAMS} from "../constants/query-params.ts";
import {type PaginatorPageChangeEvent} from "primereact/paginator";
import {type Profile, type Message} from "../pages/models.tsx";
import useLocalSettings from "./useLocalSettings.ts";
import {v4 as uuid} from 'uuid';
import {type Store, use_store} from "../store/store.tsx";

let search_timeout: any = undefined;

export interface UseDataTableProps {
    get_entries: (
        page: any,
        size: any,
        search: any,
        order_by: any,
        direction: any,
        onSuccess: (data: any) => void,
        onFailed: (messages: Message[]) => void,
        onLoading: (loading: boolean) => void
    ) => void,
    get_entry: (
        id: any,
        onSuccess: (data: any) => void,
        onFailed: (messages: Message[]) => void,
        onLoading: (loading: boolean) => void
    ) => void,
    remove: (
        id: string,
        onSuccess: (data: any) => void,
        onFailed: (messages: Message[]) => void,
        onLoading: (loading: boolean) => void
    ) => void,
    response_entry_key: string,
    response_entries_key: string,
    page_size?: number,
    page_number_key?: string,
    page_size_key?: string,
    order_by_key?: string,
    direction_key?: string,
    search_key?: string,
    view_key?: string,
    row_id: any,
    extra_change_to_watch?: any,
    extra_params_to_watch?: string[]
}

const DEFAULT_PAGE: number = 0;

const useDataTable = <T> (props: UseDataTableProps) => {
    const profile: Profile | undefined = use_store((state: Store) => state.profile);
    const set_messages = use_store((state: Store) => state.set_messages);
    const set_is_loading = use_store((state: Store) => state.set_loading);

    const [total_entries, set_total_entries] = useState<number>();

    const [entries, set_entries] = useState<T[] | undefined>(undefined);

    const [search_term, set_search_term] = useState<string>('');

    const [entry, set_entry] = useState<T>();

    const [first, set_first] = useState<number>();

    const {get_param, set_param, has_param, change_in_params, update_params, delete_param} = useLocalSettings({user_id: profile?.id ?? 0, on_loading: set_is_loading, on_failed: set_messages})

    const DEFAULT_SIZE: number = props.page_size ?? 30;

    //Allow overriding of keys incase you have multiple tables on one page
    const PAGE_NUMBER_KEY = props.page_number_key ?? PARAMS.page;
    const PAGE_SIZE_KEY = props.page_size_key ?? PARAMS.paginate;
    const ORDER_BY_KEY = props.order_by_key ?? PARAMS.order;
    const ORDER_DIRECTION_KEY = props.direction_key ?? PARAMS.direction;
    const SEARCH_KEY = props.search_key ?? PARAMS.search;
    const VIEW_KEY = props.view_key ?? PARAMS.id;

    const PARAMS_TO_WATCH = props?.extra_params_to_watch ?? []
    PARAMS_TO_WATCH.push(PAGE_NUMBER_KEY)
    PARAMS_TO_WATCH.push(PAGE_SIZE_KEY)
    PARAMS_TO_WATCH.push(ORDER_BY_KEY)
    PARAMS_TO_WATCH.push(ORDER_DIRECTION_KEY)
    PARAMS_TO_WATCH.push(SEARCH_KEY)

    const get_params_obj = () => {
        const obj: any = {};
        for(const key of PARAMS_TO_WATCH){
            obj[key] = get_param(key);
        }
        return obj
    }

    const [params_obj, set_params_obj] = useState<any>(get_params_obj());

    useEffect(() => {
        set_params_obj((prev: any) => {
            const obj = get_params_obj();

            for(const key of Object.keys(obj))
                if(obj[key] != prev[key])
                    return obj

            return prev
        });
    }, [change_in_params]);


    //get list whenever query params change
    useEffect(() => {
        set_first(get_first());

        props.get_entries(
            get_param(PAGE_NUMBER_KEY) ?? DEFAULT_PAGE.toString(),
            get_param(PAGE_SIZE_KEY) ?? DEFAULT_SIZE.toString(),
            get_param(SEARCH_KEY),
            get_param(ORDER_BY_KEY),
            get_param(ORDER_DIRECTION_KEY),
            data => {
                set_entries(data[props.response_entries_key]?.map((d: any) => {
                    return {
                        ...d,
                        data_table_unique_key: uuid()
                    }
                }));
                set_total_entries(data?.pagination?.total ?? data?.total);
            },
            set_messages,
            set_is_loading
        )
    }, [params_obj, props.extra_change_to_watch]);

    //clear entry if not on edit/view/add
    useEffect(() => {
        const {action} = has_param(VIEW_KEY) ? get_id_action_tab(get_param(VIEW_KEY) ?? ` ${PARAM_DELIMITER} `) : {action: ''};

        if(action == ACTIONS.add || action == ACTIONS.edit || action == ACTIONS.view)
            return;

        set_entry(undefined);
    }, [change_in_params]);

    //whenever search query param changes update state accordingly
    useEffect(() => {
        const SEARCH = SEARCH_KEY;
        if(has_param(SEARCH))
            set_search_term(get_param(SEARCH) ?? '');
        else
            set_search_term('');

    }, [change_in_params]);

    //get by id whenever query param changes
    useEffect(() => {
        if(!has_param(VIEW_KEY)) return;
        const {id} = get_id_action_tab(get_param(VIEW_KEY) ?? ` ${PARAM_DELIMITER} `);

        if(!entry && id != '-1'){
            props.get_entry(
                id,
                (response) => {
                    if(props.response_entry_key)
                        set_entry(response[props.response_entry_key]);
                    else
                        set_entry(response)
                },
                set_messages,
                set_is_loading
            )
        }
    }, [change_in_params]);

    const on_sort = (options: DataTableStateEvent) => {
        if(!options.sortOrder) return;
        let direction = 'asc';
        if(options.sortOrder < 0)
            direction = 'desc';

        set_param(ORDER_BY_KEY, options.sortField)
        set_param(ORDER_DIRECTION_KEY, direction)

        update_params();
    }

    const on_page = (options: PaginatorPageChangeEvent) => {
        let page = 0;
        if(options.page)
            page = options.page;
        set_param(PAGE_NUMBER_KEY, page.toString());
        update_params();
    }

    const get_sort_order = (order: string) : SortOrder => {
        if(!order)
            return 0;

        return order === 'asc' ? 1 : -1;
    }

    const get_first = () : number => {
        let temp_size = DEFAULT_SIZE;
        const SIZE = PAGE_SIZE_KEY;
        if(has_param(SIZE)){
            temp_size = +(get_param(SIZE) ?? DEFAULT_SIZE);
        }

        let temp_page = DEFAULT_PAGE;
        const PAGE = PAGE_NUMBER_KEY;
        if(has_param(PAGE)){
            temp_page = +(get_param(PAGE) ?? DEFAULT_PAGE);
        }

        return temp_size * temp_page;
    }

    const search_handler = (e: ChangeEvent<HTMLInputElement>) => {
        set_search_term(e.target.value);
    }

    useEffect(() => {
        clearTimeout(search_timeout);

        if(!has_param(SEARCH_KEY) && search_term === '')
            return;

        if(has_param(SEARCH_KEY) && search_term == get_param(SEARCH_KEY))
            return;

        search_timeout = setTimeout(() => {
            set_param(SEARCH_KEY, search_term ?? '');
            set_param(PAGE_NUMBER_KEY, '0')
            update_params();
        }, 800)

        //hopefully clear on navigate?
        return(() => {
            clearTimeout(search_timeout);
        });
    }, [search_term]);

    const on_view = (e: DataTableRowClickEvent) => {
        set_param(VIEW_KEY, `${e.data[props.row_id]}${PARAM_DELIMITER}${ACTIONS.view}`)
        update_params();
    }

    const hide_view = (param_arr?: string[]) => {
        if(param_arr)
            for(const param of param_arr)
                delete_param(param);
        delete_param(VIEW_KEY);
        update_params();
    }

    const on_hide_view = (param_arr?: string[]) => {
        hide_view(param_arr);
        set_entry(undefined);
    }

    const on_hide_edit = () => {
        const parts = get_param(VIEW_KEY)?.split(PARAM_DELIMITER);
        if(!parts) return;
        const id = parts[0];
        set_param(VIEW_KEY, `${id}${PARAM_DELIMITER}${ACTIONS.view}`)
        update_params();
    }

    const on_edit= () => {
        const parts = get_param(VIEW_KEY)?.split(PARAM_DELIMITER);
        if(!parts) return;
        const id = parts[0];
        set_param(VIEW_KEY, `${id}${PARAM_DELIMITER}${ACTIONS.edit}`)
        update_params();
    }

    const on_add = () => {
        set_entry(undefined);
        set_param(VIEW_KEY, `${-1}${PARAM_DELIMITER}${ACTIONS.add}`)
        update_params();
    }

    const on_delete = () => {
        // const parts = query_params?.get(PARAMS.id)?.split('-');
        // if(!parts) return;
        // const id = parts[0];
        // query_params.set(PARAMS.id, `${id}-${ACTIONS.remove}`)
        // set_query_params(query_params);
    }

    const on_confirm_delete = () => {
        // props.remove(
        //     query_params.get(PAGES.REMOVE),
        //     response => {
        //         context.add_messages(response.messages);
        //         const params = new URLSearchParams(query_params.toString());
        //         params.delete(PAGES.VIEW);
        //         params.delete(PAGES.REMOVE);
        //         router(path_name + `?${params.toString()}`, {scroll: false});
        //     },
        //     context.add_messages,
        //     context.set_loading
        // )
    }

    const on_cancel_delete = () => {
        // const params = new URLSearchParams(query_params.toString());
        // params.set(PAGES.VIEW, params.get(PAGES.REMOVE));
        // params.delete(PAGES.REMOVE);
        // router(path_name + `?${params.toString()}`, {scroll: false});
    }

    const clear_entries = () => {
        set_entries(undefined);
    }

    return({
        get_first,
        set_first,
        set_total_entries,
        set_entries,
        entries,
        total_entries,
        entry,
        on_sort,
        on_page,
        get_sort_order,
        first,
        rows: get_param(PAGE_SIZE_KEY) ?? DEFAULT_SIZE,
        search_handler,
        on_view,
        on_hide_view,
        on_hide_edit,
        on_edit,
        on_add,
        on_delete,
        on_confirm_delete,
        on_cancel_delete,
        DEFAULT_SIZE,
        search_term,
        clear_entries
    });
}

export default useDataTable;