import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { useLocation } from 'react-router';
import {last_page_visited, settings_key} from "../constants/query-params.ts";

interface SettingsProps {
    on_loading: (loading: boolean) => void,
    on_failed: (response: any) => void,
    user_id: number
}

//Will store a stringified json object in local storage
//The keys will be the pathname and the value will be an object.
//Local storage key will be settings_key_23 where 23 is the id of the user, this way we don't cross profile leak
// This is what the object will look like:
// {
//   '/sentinel/users': 'page=1&size=69&search=test',
//   '/instances/module-usage': 'type=test&instances=1,2,3&modules=4,5,6&grouping=instance'
// }
const useLocalSettings = (props: SettingsProps) => {
    const [query_params, set_query_params] = useSearchParams();
    const pathname = useLocation().pathname;

    //update last visited page
    useEffect(() => {
        const login_path = '/auth/login';
        if(!props.user_id)
            return;

        const settings = get_all_settings();
        if(!pathname.includes(login_path))
            settings[last_page_visited] = pathname;
        set_all_settings(settings);
    }, [pathname, props.user_id]);

    //get all settings for user
    const get_all_settings = () => {
        const value = localStorage.getItem(settings_key(props.user_id));
        console.debug("get_all_settings ", value);
        const setting = value ? JSON.parse(value) : null;
        return setting == null ? {} : setting;
    }

    //updates local storage, sets local state, send request to backend
    const set_page_setting = (value: string) => {
        const settings = get_all_settings();

        settings[pathname] = value;
        set_all_settings(settings);
    }

    //sets all settings for specific user
    const set_all_settings = (settings: object) => {
        console.debug("set_all_settings ", settings)
        localStorage.setItem(settings_key(props.user_id), JSON.stringify(settings));

        // storage_service.store_settings(
        //     () => {},
        //     props.on_loading,
        //     props.on_failed,
        //     JSON.stringify(settings),
        //     () => {}
        // );
    }

    const set_param = (key: string, value: string): void => {
        //set on query string
        query_params.set(key, value);
    }

    const delete_param = (key: string): URLSearchParams => {
        //delete from query string
        if(query_params.has(key))
            query_params.delete(key);
        //delete from local storage
        const params = retrieve_local_storage_params();
        //update local storage
        if(params.has(key)){
            params.delete(key)
            set_page_setting(params.toString());
        }
        //return update query string
        return query_params;
    }

    const has_param = (key: string) => {
        if(query_params.has(key))
            return true;
        const params = retrieve_local_storage_params();
        return params.has(key);
    }

    const get_param = (key: string) => {
        const params = retrieve_local_storage_params();
        if(query_params.has(key))
            return query_params.get(key);
        if(params.has(key))
            return params.get(key);
        return undefined;
    }

    //update query_params and local_storage
    const update_params = () => {
        const url_search_params = query_params;
        if(!url_search_params || !props.user_id)
            return;

        //combine local storage params with query params, otherwise local storage params will be lost
        const prev_params = retrieve_local_storage_params();
        for(const key of prev_params.keys())
            if(!url_search_params.has(key))
                url_search_params.set(key, prev_params.get(key) ?? '')

        set_page_setting(url_search_params.toString());
        set_query_params(url_search_params);
    }

    const retrieve_local_storage_params = () => {
        let params = get_all_settings()[pathname];
        if(!params)
            params = '';
        return new URLSearchParams(params)
    }

    return { last_page_visited: get_all_settings()[last_page_visited], get_param, has_param, delete_param, update_params, change_in_params: query_params, set_param };
};

export default useLocalSettings;
