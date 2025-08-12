export const PARAMS = {
    page: 'page_number',
    paginate: 'page_size',
    search: 'search_term',
    order: 'order_by',
    direction: 'order_direction',
    id: 'id',
    navigation: 'navigation',
}

export const ACTIONS = {
    view: 'view',
    edit: 'edit',
    add: 'add'
}

export const settings_key = (user_id: number) => `jpass_settings_${user_id}`;
export const last_page_visited = 'last_page_visited';
export const PARAM_DELIMITER = '_';

export const get_id_action_tab = (param: string | undefined | null): {id?: string, action?: string, tab?: string} => {
    if(!param) return {};
    let id, action, tab;
    const parts = param.split(PARAM_DELIMITER);
    if(!parts) return {};
    if(parts.length > 0)
        id = parts[0];
    if(parts.length > 1)
        action = parts[1];
    if(parts.length > 2)
        tab = parts[2];
    return {id, action, tab}
}