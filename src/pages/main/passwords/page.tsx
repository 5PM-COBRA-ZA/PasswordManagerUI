import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {InputText} from "primereact/inputtext";
import {Paginator} from "primereact/paginator";
import './page.css';
import {Button} from "primereact/button";
import PasswordForm from "./form.tsx";
import {type Store, use_store} from "../../../store/store.tsx";
import type {Profile} from "../../models.tsx";
import {useEffect, useState} from "react";
import PasswordsService from "./service.ts";
import useDataTable from "../../../hooks/useDataTable.ts";
import type {Password} from "./model.ts";
import {ACTIONS, get_id_action_tab, PARAMS} from "../../../constants/query-params.ts";
import useLocalSettings from "../../../hooks/useLocalSettings.ts";
import {Toolbar} from "primereact/toolbar";
import {InputIcon} from "primereact/inputicon";
import {IconField} from "primereact/iconfield";

const service = new PasswordsService();

const PasswordsPage = () => {
    const [refresh_counter, set_refresh_counter] = useState<number>(0);
    const [action, set_action] = useState<string | undefined>();
    const profile: Profile | undefined = use_store((state: Store) => state.profile);
    const set_messages = use_store((state: Store) => state.set_messages);
    const set_is_loading = use_store((state: Store) => state.set_loading);

    const {get_param, has_param, change_in_params} = useLocalSettings({user_id: profile?.id ?? 0, on_loading: set_is_loading, on_failed: set_messages});


    const {
        entry,
        entries,
        total_entries,
        on_sort,
        on_page,
        get_sort_order,
        first,
        rows,
        on_view,
        search_handler,
        search_term,
        on_add,
        on_hide_view
    } = useDataTable<Password>({
        remove: () =>  {},
        get_entry: (id, onSuccess, onFailed, onLoading) => {
            service.get_password(
                id,
                onSuccess,
                onFailed,
                onLoading
            )
        },
        get_entries: (page, size, search, order_by, direction, onSuccess, onFailed, onLoading) => {
            service.get_passwords(
                page,
                size,
                search,
                order_by,
                direction,
                onSuccess,
                onFailed,
                onLoading
            );
        },
        response_entry_key: 'password',
        response_entries_key: 'passwords',
        row_id: 'id',
        extra_change_to_watch: refresh_counter
    });

    useEffect(() => {
        if(has_param(PARAMS.id)){
            const {action} = get_id_action_tab(get_param(PARAMS.id))
            set_action(action);
        }else{
            set_action(undefined);
        }
    }, [change_in_params]);

    const start_content = (
        <IconField iconPosition="left">
            <InputIcon className="pi pi-search" />
            <InputText placeholder="Search" value={search_term} onChange={search_handler} />
        </IconField>
    );

    const end_content = (
        <Button
            icon="pi pi-plus"
            outlined
            onClick={() => {
                on_add();
            }}
        />
    )

    const password_template = (data: Password) => {
        return(
            <div>
                {data.password}
            </div>
        );
    }

    return(
        <>
            <Toolbar start={start_content} end={end_content} pt={{root: {style: {background: 'var(--surface-card)'}}}} />

            <DataTable
                id={'sticky-header-table'}
                pt={{wrapper: {style: {overflow: 'visible'}}}}
                onRowClick={on_view}
                lazy
                value={entries}
                sortOrder={get_sort_order(get_param(PARAMS.direction) ?? '')}
                sortField={get_param(PARAMS.order) ?? ''}
                onSort={on_sort}
                showGridlines
                metaKeySelection={false}
                selectionMode={'single'}
                selection={entry}
                dataKey={'id'}
            >
                <Column sortable headerStyle={{width: '33.34%'}} field="website" header="Website"></Column>
                <Column sortable headerStyle={{width: '33.33%'}} field="username" header="Username"></Column>
                <Column headerStyle={{width: '33.33%'}} body={password_template} field="password" header="Password"></Column>
            </DataTable>

            <div className="card">
                <Paginator
                    className={'p-0'}
                    first={first}
                    rows={+rows}
                    onPageChange={on_page}
                    totalRecords={total_entries}
                />
            </div>

            {[ACTIONS.edit, ACTIONS.add, ACTIONS.view].includes(action ?? '') &&
                <PasswordForm
                    password={entry}
                    on_close={(refresh: boolean) => {
                        on_hide_view([ACTIONS.edit, ACTIONS.add, ACTIONS.view]);
                        if(refresh)
                            set_refresh_counter((prev: number) => prev + 1);
                    }}
                />
            }
        </>
    );
};

export default PasswordsPage;